import { ENV } from '@core/config';
import { Collection, Db, MongoClient, ServerApiVersion } from 'mongodb';

export class MongoConnection {
    public client: MongoClient;
    public database: Db | null;

    constructor(url: string, database?: string) {
        this.client = new MongoClient(url, {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            },
            retryWrites: true,
            retryReads: true,
            readConcern: {
                level: 'majority',
            },
            readPreference: 'secondaryPreferred',
        });

        this.database = this.client.db(database ?? 'syncmarket') ?? null;
    }

    async connect(): Promise<void> {
        await this.client.connect();
    }

    async disconnect(): Promise<void> {
        await this.client?.close();

        this.client = undefined;
    }

    public getCollection<T>(name: string): Collection<T> {
        const db = this.database;

        if (!db) {
            throw new Error('Database is not connected');
        }

        return db.collection(name);
    }
}

export const mongoDB = new MongoConnection(ENV.DATABASE_URL);
