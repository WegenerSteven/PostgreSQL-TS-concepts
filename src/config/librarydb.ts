import env from './env';
import { Pool, PoolConfig, QueryResult } from 'pg';


//create database
class LibraryDB {
    private pool: Pool;

    constructor() {
        const poolConfig: PoolConfig = {
            host: env.database.host,
            port: env.database.port,
            user: env.database.user,
            password: env.database.password,
            database: env.database.database,
            max: 20,
            idleTimeoutMillis: 30000,
            connectionTimeoutMillis: 5000,
        };

        this.pool = new Pool(poolConfig);

        this.pool.on('connect', () => {
            console.log('connected to the Library Database');
        });

        this.pool.on('error', (err) => {
            console.error('unexpected error on idle client', err);
            process.exit(-1);
        });
    }

    //query method
    async executeQuery(text: string, params: any[] = []): Promise<QueryResult> {
        const client = await this.pool.connect();
        try {
            const start = Date.now();
            const result = await client.query(text, params);
            const duration = Date.now() - start;
            console.log(`Executed query: ${text} - Duration: ${duration}ms`);
            return result;
        } catch (error) {
            console.error('Database query error:', error);
            throw (error);
        } finally {
            client.release();
        }
    }

    //initialize tables
    async initializeTables(): Promise<void> {
        try {
            //create student's table
            await this.executeQuery(`
                CREATE TABLE IF NOT EXISTS students(
                    id SERIAL PRIMARY KEY,
                    Fname VARCHAR(50) NOT NULL,
                    Lname VARCHAR(50) NOT NULL,
                    email VARCHAR(100) UNIQUE NOT NULL,
                    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )                    
                `);
            console.log("student table created");

            //ebooks table
            await this.executeQuery(`CREATE TABLE IF NOT EXISTS ebooks (
                    id SERIAL PRIMARY KEY,
                    title VARCHAR(255) NOT NULL,
                    author VARCHAR(100) NOT NULL,
                    file_url VARCHAR(255) NOT NULL)`
            );
            console.log("ebooks table created");

            //Borrowed Items table
            await this.executeQuery(`
                CREATE TABLE IF NOT EXISTS borrowed_items(
                id SERIAL PRIMARY KEY,
                student_id INT REFERENCES students(id),
                item_type VARCHAR(20) NOT NULL,
                item_id INT NOT NULL,
                borrow_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                return_date TIMESTAMP
            )
             `);
            console.log("borrowed items table created or already exists")


            // Librarians table
            await this.executeQuery(`
                CREATE TABLE IF NOT EXISTS librarians(
                id SERIAL PRIMARY KEY,
                fname VARCHAR(50) NOT NULL,
                lname VARCHAR(50) NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                hire_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
            `);
            console.log("librarians table created or already exists")


            // Books table
            await this.executeQuery(`
                CREATE TABLE IF NOT EXISTS books(
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                author VARCHAR(100) NOT NULL,
                published_year INT,
                copies_available INT DEFAULT 1
            )`)
            console.log("created book's table or already exists")


            // DVDs table
            await this.executeQuery(`
                CREATE TABLE IF NOT EXISTS dvds(
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                director VARCHAR(100),
                release_year INT,
                copies_available INT DEFAULT 1
            )
        `)
            console.log("created dvd's table created");
            console.log("Database schema initialized successfully");

        } catch (err) {
            console.error("Error initializing database:", err);
            throw err;
        }
    }
    getPool(): Pool {
        return this.pool
    }
}

//create singleton instance
const db = new LibraryDB();

//export instance methods and the database objects
export const executeQuery = (text: string, params: any[] = []) => db.executeQuery(text, params);
export const initializeTables = () => db.initializeTables();
export default db;

