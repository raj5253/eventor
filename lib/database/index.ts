// npm install mongoose mongodb

import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI

let cached = (global as any).mongoose || { conn: null, promise: null };

export const connectToDatabase = async () => {
    console.log("calling db connection")
    if (cached.conn) return cached.conn;

    if (!MONGODB_URI) throw new Error('MONGODB_URI is missing!');

    cached.promise = cached.promise || mongoose.connect(MONGODB_URI, {
        dbName: 'eventor',
        bufferCommands: false
    });

    cached.conn = await cached.promise;

    return cached.conn;
}

/* why this type of pattern?
You Remember that in next.js for each database operation, 
you make seprate call to server. This is bc of serverless func.
So, better we use cache data, instead of establishing nw each time.

so now the server actions(the functions used as server) will be using the connection stored in cache.
*/