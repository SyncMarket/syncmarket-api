import { ENV } from '@/core/config';
import { Collection, MongoClient, ServerApiVersion } from 'mongodb';

class MongoConnection {
    private client: MongoClient;

    constructor(url: string) {
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
    }

    async connect(url: string): Promise<void> {
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

        await this.client.connect();
    }

    async disconnect(): Promise<void> {
        await this.client?.close();

        this.client = undefined;
    }

    public getCollection<T>(name: string): Collection<T> {
        const db = this.client.db();

        if (!db) {
            throw new Error('Database is not connected');
        }

        return db.collection(name);
    }
}

export const mongoDB = new MongoConnection(ENV.DATABASE_URL);
