// Importar módulos necesarios
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const exphbs = require('express-handlebars');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const MySQLStore = require('express-mysql-session')(session);
const bodyparser = require('body-parser');
const fileUpload = require("express-fileupload");
const helmet = require('helmet');
// const rateLimit = require('express-rate-limit');
// const csrf = require('csurf');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const { minify } = require('html-minifier-terser');
const winston = require('winston');
const cors = require('cors')
const { Loader } = require('@googlemaps/js-api-loader')

// Importar módulos locales
const { MYSQLHOST, MYSQLUSER, MYSQLPASSWORD, MYSQLDATABASE, MYSQLPORT } = require('./keys');
require('./lib/passport');

// Crear aplicación Express
const app = express();

// Configurar helmet y Content Security Policy
// app.use(helmet({
//     contentSecurityPolicy: {
//         directives: {
//             ...helmet.contentSecurityPolicy.getDefaultDirectives(),
//             "script-src": ["'self'", "'unsafe-inline'", "'unsafe-eval'", "https://maps.googleapis.com"],
//             "img-src": ["'self'", "data:", "blob:", "http://localhost:4200", "https://maps.gstatic.com", "https://*.googleapis.com"],
//             "frame-src": ["'self'", "blob:", "https://www.google.com"],
//             "connect-src": ["'self'", "http://localhost:4200", "https://maps.googleapis.com"],
//             "object-src": ["'none'"],
//             "default-src": ["'self'"]
//         }
//     },
// }));

// Configurar almacenamiento de sesiones MySQL
const mysqlOptions = {
    host: MYSQLHOST,
    port: MYSQLPORT,
    user: MYSQLUSER,
    password: MYSQLPASSWORD,
    database: MYSQLDATABASE,
    createDatabaseTable: true
};
const sessionStore = new MySQLStore(mysqlOptions);

app.use(session({
    store: sessionStore,
    secret: "SESSION_SECRET",
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        sameSite: 'Strict'
    }
}));


// Configurar motor de vistas
app.set('port', process.env.PORT || 4200);

// Configurar middleware
app.use(cookieParser());
app.use(fileUpload({ createParentPath: true }));
app.use(morgan('dev'));
app.use(express.json({ limit: '300mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// Middleware de seguridad y rendimiento
app.use(helmet.referrerPolicy({ policy: 'strict-origin-when-cross-origin' }));
app.use(compression());

// Middleware para minificar HTML
app.use(async (req, res, next) => {
    const originalSend = res.send.bind(res);
    res.send = async function (body) {
        if (typeof body === 'string') {
            try {
                body = await minify(body, {
                    removeComments: true,
                    collapseWhitespace: true,
                    minifyCSS: true,
                    minifyJS: true,
                });
            } catch (err) {
                console.error('Error minifying HTML:', err);
            }
        }
        return originalSend(body);
    };
    next();
});


//!Middleware de manejo de errores
// const loginLimiter = rateLimit({
//     windowMs: 15 * 60 * 1000,
//     max: 5, 
//     message: 'Demasiados intentos de inicio de sesión desde esta IP, por favor intente nuevamente después de 15 minutos.'
// });
// app.use('/', loginLimiter);

//! Middleware de manejo de errores
// app.use((err, req, res, next) => {
//     if (res.headersSent) {
//         return next(err);
//     }
//     if (err.name === 'ValidationError') {
//         return res.status(400).json({ error: 'Datos inválidos.' });
//     }
//     if (err.code === 'EBADCSRFTOKEN') {
//         res.status(403).send('La validación del token CSRF ha fallado. Por favor, recarga la página.');
//     } else {
//         console.error(err.stack);
//         res.status(500).send('Error interno del servidor');
//     }
// });
// Configurar variables globales
app.use((req, res, next) => {
    app.locals.message = req.flash('message');
    app.locals.success = req.flash('success');
    app.locals.user = req.user || null;
    next();
});

// Middleware para manejar cookies
// app.use(cookieParser());

// Configurar middleware CSRF
// const csrfProtection = csrf({ cookie: true });
// Middleware para protección CSRF
// app.use(csrfProtection);

// Configurar variables globales
// app.use((req, res, next) => {
//     app.locals.message = req.flash('message');
//     app.locals.success = req.flash('success');
//     app.locals.user = req.user || null;
//     app.locals.csrfToken = req.csrfToken(); // Agrega el token CSRF a las variables locales
//     next();
// });

// Configuración de archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));
app.use('/src/public', express.static(path.join(__dirname, 'src/public')));

// Asegúrate de que esto cubre tus imágenes
app.use('/img/usuario', express.static(path.join(__dirname, 'public/img/usuario')));

// Configurar sistema de logging
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' })
    ]
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple()
    }));
}
app.use(cors({
    origin: 'http://localhost:8080' // Cambia esto al origen de tu aplicación Vue
  }));


app.use(morgan('combined', { stream: { write: message => logger.info(message.trim()) } }));

// Importar y usar las rutas
const restauranteRouter = require('./router/restauranteRouter');
const employeeRouter = require('./router/employeeRouter')
const metodosRouter = require('./router/metodosRouter');
const inventarioRouter = require('./router/inventarioRouter');
const userRouter = require('./router/usuarioRouter')
const proveedoresRouter = require('./router/proveedoresRouter');


app.use('/restaurante', restauranteRouter)
app.use('/empleado', employeeRouter)
app.use('/metodos', metodosRouter)
app.use('/inventario', inventarioRouter)
app.use('/usuario', userRouter)
app.use('/proveedores', proveedoresRouter)

//app.use('/usuario', userRouter)

//app.use('/restaurante', restauranteRouter); 


// Exportar la aplicación
module.exports = app;