import { NODE_ENVIRONMENT } from './system.enum';

const NODE_ENV = process.env.NODE_ENV || NODE_ENVIRONMENT.Production;

const DevelopmentConfig = {
    type:'development',
    database: {
        host: "localhost",
        user: "derozgur",
        password: "123456"
    }
};

const ProductionConfig = {
    type:'production',
    database: {
        host: "localhost",
        user: "derozgur",
        password: "123456"
    }
};

export const isProduction = NODE_ENV === NODE_ENVIRONMENT.Production;

export default isProduction && ProductionConfig || DevelopmentConfig;