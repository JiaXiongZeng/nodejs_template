const TYPES = {
    IConfigSettings: Symbol.for('IConfigSettings'),
    IGeminiService: Symbol.for('IGeminiService'),
    IRedisClient: Symbol.for('IRedisClient'),
    IRdiesJsonClient: Symbol.for('IRedisJsonClient'),
    IRedisSessionStore: Symbol.for('ISessionStore'),
    RedisSessionMiddleware: Symbol.for('RedisSessionMiddleware')
};

export { TYPES };