
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Space
 * 
 */
export type Space = $Result.DefaultSelection<Prisma.$SpacePayload>
/**
 * Model spaceElements
 * 
 */
export type spaceElements = $Result.DefaultSelection<Prisma.$spaceElementsPayload>
/**
 * Model Element
 * 
 */
export type Element = $Result.DefaultSelection<Prisma.$ElementPayload>
/**
 * Model Map
 * 
 */
export type Map = $Result.DefaultSelection<Prisma.$MapPayload>
/**
 * Model MapElements
 * 
 */
export type MapElements = $Result.DefaultSelection<Prisma.$MapElementsPayload>
/**
 * Model Avatar
 * 
 */
export type Avatar = $Result.DefaultSelection<Prisma.$AvatarPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Role: {
  Admin: 'Admin',
  User: 'User'
};

export type Role = (typeof Role)[keyof typeof Role]

}

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.space`: Exposes CRUD operations for the **Space** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Spaces
    * const spaces = await prisma.space.findMany()
    * ```
    */
  get space(): Prisma.SpaceDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.spaceElements`: Exposes CRUD operations for the **spaceElements** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SpaceElements
    * const spaceElements = await prisma.spaceElements.findMany()
    * ```
    */
  get spaceElements(): Prisma.spaceElementsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.element`: Exposes CRUD operations for the **Element** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Elements
    * const elements = await prisma.element.findMany()
    * ```
    */
  get element(): Prisma.ElementDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.map`: Exposes CRUD operations for the **Map** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Maps
    * const maps = await prisma.map.findMany()
    * ```
    */
  get map(): Prisma.MapDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.mapElements`: Exposes CRUD operations for the **MapElements** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MapElements
    * const mapElements = await prisma.mapElements.findMany()
    * ```
    */
  get mapElements(): Prisma.MapElementsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.avatar`: Exposes CRUD operations for the **Avatar** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Avatars
    * const avatars = await prisma.avatar.findMany()
    * ```
    */
  get avatar(): Prisma.AvatarDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.8.2
   * Query Engine version: 2060c79ba17c6bb9f5823312b6f6b7f4a845738e
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Space: 'Space',
    spaceElements: 'spaceElements',
    Element: 'Element',
    Map: 'Map',
    MapElements: 'MapElements',
    Avatar: 'Avatar'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "space" | "spaceElements" | "element" | "map" | "mapElements" | "avatar"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Space: {
        payload: Prisma.$SpacePayload<ExtArgs>
        fields: Prisma.SpaceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SpaceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpacePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SpaceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpacePayload>
          }
          findFirst: {
            args: Prisma.SpaceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpacePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SpaceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpacePayload>
          }
          findMany: {
            args: Prisma.SpaceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpacePayload>[]
          }
          create: {
            args: Prisma.SpaceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpacePayload>
          }
          createMany: {
            args: Prisma.SpaceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SpaceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpacePayload>[]
          }
          delete: {
            args: Prisma.SpaceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpacePayload>
          }
          update: {
            args: Prisma.SpaceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpacePayload>
          }
          deleteMany: {
            args: Prisma.SpaceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SpaceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SpaceUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpacePayload>[]
          }
          upsert: {
            args: Prisma.SpaceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpacePayload>
          }
          aggregate: {
            args: Prisma.SpaceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSpace>
          }
          groupBy: {
            args: Prisma.SpaceGroupByArgs<ExtArgs>
            result: $Utils.Optional<SpaceGroupByOutputType>[]
          }
          count: {
            args: Prisma.SpaceCountArgs<ExtArgs>
            result: $Utils.Optional<SpaceCountAggregateOutputType> | number
          }
        }
      }
      spaceElements: {
        payload: Prisma.$spaceElementsPayload<ExtArgs>
        fields: Prisma.spaceElementsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.spaceElementsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$spaceElementsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.spaceElementsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$spaceElementsPayload>
          }
          findFirst: {
            args: Prisma.spaceElementsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$spaceElementsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.spaceElementsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$spaceElementsPayload>
          }
          findMany: {
            args: Prisma.spaceElementsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$spaceElementsPayload>[]
          }
          create: {
            args: Prisma.spaceElementsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$spaceElementsPayload>
          }
          createMany: {
            args: Prisma.spaceElementsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.spaceElementsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$spaceElementsPayload>[]
          }
          delete: {
            args: Prisma.spaceElementsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$spaceElementsPayload>
          }
          update: {
            args: Prisma.spaceElementsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$spaceElementsPayload>
          }
          deleteMany: {
            args: Prisma.spaceElementsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.spaceElementsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.spaceElementsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$spaceElementsPayload>[]
          }
          upsert: {
            args: Prisma.spaceElementsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$spaceElementsPayload>
          }
          aggregate: {
            args: Prisma.SpaceElementsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSpaceElements>
          }
          groupBy: {
            args: Prisma.spaceElementsGroupByArgs<ExtArgs>
            result: $Utils.Optional<SpaceElementsGroupByOutputType>[]
          }
          count: {
            args: Prisma.spaceElementsCountArgs<ExtArgs>
            result: $Utils.Optional<SpaceElementsCountAggregateOutputType> | number
          }
        }
      }
      Element: {
        payload: Prisma.$ElementPayload<ExtArgs>
        fields: Prisma.ElementFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ElementFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ElementPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ElementFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ElementPayload>
          }
          findFirst: {
            args: Prisma.ElementFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ElementPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ElementFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ElementPayload>
          }
          findMany: {
            args: Prisma.ElementFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ElementPayload>[]
          }
          create: {
            args: Prisma.ElementCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ElementPayload>
          }
          createMany: {
            args: Prisma.ElementCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ElementCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ElementPayload>[]
          }
          delete: {
            args: Prisma.ElementDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ElementPayload>
          }
          update: {
            args: Prisma.ElementUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ElementPayload>
          }
          deleteMany: {
            args: Prisma.ElementDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ElementUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ElementUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ElementPayload>[]
          }
          upsert: {
            args: Prisma.ElementUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ElementPayload>
          }
          aggregate: {
            args: Prisma.ElementAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateElement>
          }
          groupBy: {
            args: Prisma.ElementGroupByArgs<ExtArgs>
            result: $Utils.Optional<ElementGroupByOutputType>[]
          }
          count: {
            args: Prisma.ElementCountArgs<ExtArgs>
            result: $Utils.Optional<ElementCountAggregateOutputType> | number
          }
        }
      }
      Map: {
        payload: Prisma.$MapPayload<ExtArgs>
        fields: Prisma.MapFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MapFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MapPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MapFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MapPayload>
          }
          findFirst: {
            args: Prisma.MapFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MapPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MapFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MapPayload>
          }
          findMany: {
            args: Prisma.MapFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MapPayload>[]
          }
          create: {
            args: Prisma.MapCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MapPayload>
          }
          createMany: {
            args: Prisma.MapCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MapCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MapPayload>[]
          }
          delete: {
            args: Prisma.MapDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MapPayload>
          }
          update: {
            args: Prisma.MapUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MapPayload>
          }
          deleteMany: {
            args: Prisma.MapDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MapUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MapUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MapPayload>[]
          }
          upsert: {
            args: Prisma.MapUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MapPayload>
          }
          aggregate: {
            args: Prisma.MapAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMap>
          }
          groupBy: {
            args: Prisma.MapGroupByArgs<ExtArgs>
            result: $Utils.Optional<MapGroupByOutputType>[]
          }
          count: {
            args: Prisma.MapCountArgs<ExtArgs>
            result: $Utils.Optional<MapCountAggregateOutputType> | number
          }
        }
      }
      MapElements: {
        payload: Prisma.$MapElementsPayload<ExtArgs>
        fields: Prisma.MapElementsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MapElementsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MapElementsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MapElementsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MapElementsPayload>
          }
          findFirst: {
            args: Prisma.MapElementsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MapElementsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MapElementsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MapElementsPayload>
          }
          findMany: {
            args: Prisma.MapElementsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MapElementsPayload>[]
          }
          create: {
            args: Prisma.MapElementsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MapElementsPayload>
          }
          createMany: {
            args: Prisma.MapElementsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MapElementsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MapElementsPayload>[]
          }
          delete: {
            args: Prisma.MapElementsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MapElementsPayload>
          }
          update: {
            args: Prisma.MapElementsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MapElementsPayload>
          }
          deleteMany: {
            args: Prisma.MapElementsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MapElementsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MapElementsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MapElementsPayload>[]
          }
          upsert: {
            args: Prisma.MapElementsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MapElementsPayload>
          }
          aggregate: {
            args: Prisma.MapElementsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMapElements>
          }
          groupBy: {
            args: Prisma.MapElementsGroupByArgs<ExtArgs>
            result: $Utils.Optional<MapElementsGroupByOutputType>[]
          }
          count: {
            args: Prisma.MapElementsCountArgs<ExtArgs>
            result: $Utils.Optional<MapElementsCountAggregateOutputType> | number
          }
        }
      }
      Avatar: {
        payload: Prisma.$AvatarPayload<ExtArgs>
        fields: Prisma.AvatarFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AvatarFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvatarPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AvatarFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvatarPayload>
          }
          findFirst: {
            args: Prisma.AvatarFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvatarPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AvatarFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvatarPayload>
          }
          findMany: {
            args: Prisma.AvatarFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvatarPayload>[]
          }
          create: {
            args: Prisma.AvatarCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvatarPayload>
          }
          createMany: {
            args: Prisma.AvatarCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AvatarCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvatarPayload>[]
          }
          delete: {
            args: Prisma.AvatarDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvatarPayload>
          }
          update: {
            args: Prisma.AvatarUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvatarPayload>
          }
          deleteMany: {
            args: Prisma.AvatarDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AvatarUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AvatarUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvatarPayload>[]
          }
          upsert: {
            args: Prisma.AvatarUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvatarPayload>
          }
          aggregate: {
            args: Prisma.AvatarAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAvatar>
          }
          groupBy: {
            args: Prisma.AvatarGroupByArgs<ExtArgs>
            result: $Utils.Optional<AvatarGroupByOutputType>[]
          }
          count: {
            args: Prisma.AvatarCountArgs<ExtArgs>
            result: $Utils.Optional<AvatarCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    space?: SpaceOmit
    spaceElements?: spaceElementsOmit
    element?: ElementOmit
    map?: MapOmit
    mapElements?: MapElementsOmit
    avatar?: AvatarOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    Space: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Space?: boolean | UserCountOutputTypeCountSpaceArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSpaceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SpaceWhereInput
  }


  /**
   * Count Type SpaceCountOutputType
   */

  export type SpaceCountOutputType = {
    elements: number
  }

  export type SpaceCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    elements?: boolean | SpaceCountOutputTypeCountElementsArgs
  }

  // Custom InputTypes
  /**
   * SpaceCountOutputType without action
   */
  export type SpaceCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SpaceCountOutputType
     */
    select?: SpaceCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SpaceCountOutputType without action
   */
  export type SpaceCountOutputTypeCountElementsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: spaceElementsWhereInput
  }


  /**
   * Count Type ElementCountOutputType
   */

  export type ElementCountOutputType = {
    spaces: number
    mapElements: number
  }

  export type ElementCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    spaces?: boolean | ElementCountOutputTypeCountSpacesArgs
    mapElements?: boolean | ElementCountOutputTypeCountMapElementsArgs
  }

  // Custom InputTypes
  /**
   * ElementCountOutputType without action
   */
  export type ElementCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ElementCountOutputType
     */
    select?: ElementCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ElementCountOutputType without action
   */
  export type ElementCountOutputTypeCountSpacesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: spaceElementsWhereInput
  }

  /**
   * ElementCountOutputType without action
   */
  export type ElementCountOutputTypeCountMapElementsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MapElementsWhereInput
  }


  /**
   * Count Type MapCountOutputType
   */

  export type MapCountOutputType = {
    mapElements: number
  }

  export type MapCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    mapElements?: boolean | MapCountOutputTypeCountMapElementsArgs
  }

  // Custom InputTypes
  /**
   * MapCountOutputType without action
   */
  export type MapCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MapCountOutputType
     */
    select?: MapCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * MapCountOutputType without action
   */
  export type MapCountOutputTypeCountMapElementsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MapElementsWhereInput
  }


  /**
   * Count Type AvatarCountOutputType
   */

  export type AvatarCountOutputType = {
    users: number
  }

  export type AvatarCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | AvatarCountOutputTypeCountUsersArgs
  }

  // Custom InputTypes
  /**
   * AvatarCountOutputType without action
   */
  export type AvatarCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvatarCountOutputType
     */
    select?: AvatarCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AvatarCountOutputType without action
   */
  export type AvatarCountOutputTypeCountUsersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    username: string | null
    password: string | null
    avatarId: string | null
    role: $Enums.Role | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    username: string | null
    password: string | null
    avatarId: string | null
    role: $Enums.Role | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    username: number
    password: number
    avatarId: number
    role: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    username?: true
    password?: true
    avatarId?: true
    role?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    username?: true
    password?: true
    avatarId?: true
    role?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    username?: true
    password?: true
    avatarId?: true
    role?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    username: string
    password: string
    avatarId: string
    role: $Enums.Role
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    password?: boolean
    avatarId?: boolean
    role?: boolean
    Space?: boolean | User$SpaceArgs<ExtArgs>
    avatar?: boolean | AvatarDefaultArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    password?: boolean
    avatarId?: boolean
    role?: boolean
    avatar?: boolean | AvatarDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    password?: boolean
    avatarId?: boolean
    role?: boolean
    avatar?: boolean | AvatarDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    username?: boolean
    password?: boolean
    avatarId?: boolean
    role?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "username" | "password" | "avatarId" | "role", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Space?: boolean | User$SpaceArgs<ExtArgs>
    avatar?: boolean | AvatarDefaultArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    avatar?: boolean | AvatarDefaultArgs<ExtArgs>
  }
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    avatar?: boolean | AvatarDefaultArgs<ExtArgs>
  }

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      Space: Prisma.$SpacePayload<ExtArgs>[]
      avatar: Prisma.$AvatarPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      username: string
      password: string
      avatarId: string
      role: $Enums.Role
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    Space<T extends User$SpaceArgs<ExtArgs> = {}>(args?: Subset<T, User$SpaceArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SpacePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    avatar<T extends AvatarDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AvatarDefaultArgs<ExtArgs>>): Prisma__AvatarClient<$Result.GetResult<Prisma.$AvatarPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly username: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly avatarId: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'Role'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.Space
   */
  export type User$SpaceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Space
     */
    select?: SpaceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Space
     */
    omit?: SpaceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpaceInclude<ExtArgs> | null
    where?: SpaceWhereInput
    orderBy?: SpaceOrderByWithRelationInput | SpaceOrderByWithRelationInput[]
    cursor?: SpaceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SpaceScalarFieldEnum | SpaceScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Space
   */

  export type AggregateSpace = {
    _count: SpaceCountAggregateOutputType | null
    _avg: SpaceAvgAggregateOutputType | null
    _sum: SpaceSumAggregateOutputType | null
    _min: SpaceMinAggregateOutputType | null
    _max: SpaceMaxAggregateOutputType | null
  }

  export type SpaceAvgAggregateOutputType = {
    width: number | null
    height: number | null
  }

  export type SpaceSumAggregateOutputType = {
    width: number | null
    height: number | null
  }

  export type SpaceMinAggregateOutputType = {
    id: string | null
    name: string | null
    width: number | null
    height: number | null
    thumbnail: string | null
    creatorId: string | null
  }

  export type SpaceMaxAggregateOutputType = {
    id: string | null
    name: string | null
    width: number | null
    height: number | null
    thumbnail: string | null
    creatorId: string | null
  }

  export type SpaceCountAggregateOutputType = {
    id: number
    name: number
    width: number
    height: number
    thumbnail: number
    creatorId: number
    _all: number
  }


  export type SpaceAvgAggregateInputType = {
    width?: true
    height?: true
  }

  export type SpaceSumAggregateInputType = {
    width?: true
    height?: true
  }

  export type SpaceMinAggregateInputType = {
    id?: true
    name?: true
    width?: true
    height?: true
    thumbnail?: true
    creatorId?: true
  }

  export type SpaceMaxAggregateInputType = {
    id?: true
    name?: true
    width?: true
    height?: true
    thumbnail?: true
    creatorId?: true
  }

  export type SpaceCountAggregateInputType = {
    id?: true
    name?: true
    width?: true
    height?: true
    thumbnail?: true
    creatorId?: true
    _all?: true
  }

  export type SpaceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Space to aggregate.
     */
    where?: SpaceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Spaces to fetch.
     */
    orderBy?: SpaceOrderByWithRelationInput | SpaceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SpaceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Spaces from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Spaces.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Spaces
    **/
    _count?: true | SpaceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SpaceAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SpaceSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SpaceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SpaceMaxAggregateInputType
  }

  export type GetSpaceAggregateType<T extends SpaceAggregateArgs> = {
        [P in keyof T & keyof AggregateSpace]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSpace[P]>
      : GetScalarType<T[P], AggregateSpace[P]>
  }




  export type SpaceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SpaceWhereInput
    orderBy?: SpaceOrderByWithAggregationInput | SpaceOrderByWithAggregationInput[]
    by: SpaceScalarFieldEnum[] | SpaceScalarFieldEnum
    having?: SpaceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SpaceCountAggregateInputType | true
    _avg?: SpaceAvgAggregateInputType
    _sum?: SpaceSumAggregateInputType
    _min?: SpaceMinAggregateInputType
    _max?: SpaceMaxAggregateInputType
  }

  export type SpaceGroupByOutputType = {
    id: string
    name: string
    width: number
    height: number | null
    thumbnail: string | null
    creatorId: string
    _count: SpaceCountAggregateOutputType | null
    _avg: SpaceAvgAggregateOutputType | null
    _sum: SpaceSumAggregateOutputType | null
    _min: SpaceMinAggregateOutputType | null
    _max: SpaceMaxAggregateOutputType | null
  }

  type GetSpaceGroupByPayload<T extends SpaceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SpaceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SpaceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SpaceGroupByOutputType[P]>
            : GetScalarType<T[P], SpaceGroupByOutputType[P]>
        }
      >
    >


  export type SpaceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    width?: boolean
    height?: boolean
    thumbnail?: boolean
    creatorId?: boolean
    creator?: boolean | UserDefaultArgs<ExtArgs>
    elements?: boolean | Space$elementsArgs<ExtArgs>
    _count?: boolean | SpaceCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["space"]>

  export type SpaceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    width?: boolean
    height?: boolean
    thumbnail?: boolean
    creatorId?: boolean
    creator?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["space"]>

  export type SpaceSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    width?: boolean
    height?: boolean
    thumbnail?: boolean
    creatorId?: boolean
    creator?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["space"]>

  export type SpaceSelectScalar = {
    id?: boolean
    name?: boolean
    width?: boolean
    height?: boolean
    thumbnail?: boolean
    creatorId?: boolean
  }

  export type SpaceOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "width" | "height" | "thumbnail" | "creatorId", ExtArgs["result"]["space"]>
  export type SpaceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    creator?: boolean | UserDefaultArgs<ExtArgs>
    elements?: boolean | Space$elementsArgs<ExtArgs>
    _count?: boolean | SpaceCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type SpaceIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    creator?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SpaceIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    creator?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $SpacePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Space"
    objects: {
      creator: Prisma.$UserPayload<ExtArgs>
      elements: Prisma.$spaceElementsPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      width: number
      height: number | null
      thumbnail: string | null
      creatorId: string
    }, ExtArgs["result"]["space"]>
    composites: {}
  }

  type SpaceGetPayload<S extends boolean | null | undefined | SpaceDefaultArgs> = $Result.GetResult<Prisma.$SpacePayload, S>

  type SpaceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SpaceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SpaceCountAggregateInputType | true
    }

  export interface SpaceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Space'], meta: { name: 'Space' } }
    /**
     * Find zero or one Space that matches the filter.
     * @param {SpaceFindUniqueArgs} args - Arguments to find a Space
     * @example
     * // Get one Space
     * const space = await prisma.space.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SpaceFindUniqueArgs>(args: SelectSubset<T, SpaceFindUniqueArgs<ExtArgs>>): Prisma__SpaceClient<$Result.GetResult<Prisma.$SpacePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Space that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SpaceFindUniqueOrThrowArgs} args - Arguments to find a Space
     * @example
     * // Get one Space
     * const space = await prisma.space.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SpaceFindUniqueOrThrowArgs>(args: SelectSubset<T, SpaceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SpaceClient<$Result.GetResult<Prisma.$SpacePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Space that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SpaceFindFirstArgs} args - Arguments to find a Space
     * @example
     * // Get one Space
     * const space = await prisma.space.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SpaceFindFirstArgs>(args?: SelectSubset<T, SpaceFindFirstArgs<ExtArgs>>): Prisma__SpaceClient<$Result.GetResult<Prisma.$SpacePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Space that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SpaceFindFirstOrThrowArgs} args - Arguments to find a Space
     * @example
     * // Get one Space
     * const space = await prisma.space.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SpaceFindFirstOrThrowArgs>(args?: SelectSubset<T, SpaceFindFirstOrThrowArgs<ExtArgs>>): Prisma__SpaceClient<$Result.GetResult<Prisma.$SpacePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Spaces that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SpaceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Spaces
     * const spaces = await prisma.space.findMany()
     * 
     * // Get first 10 Spaces
     * const spaces = await prisma.space.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const spaceWithIdOnly = await prisma.space.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SpaceFindManyArgs>(args?: SelectSubset<T, SpaceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SpacePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Space.
     * @param {SpaceCreateArgs} args - Arguments to create a Space.
     * @example
     * // Create one Space
     * const Space = await prisma.space.create({
     *   data: {
     *     // ... data to create a Space
     *   }
     * })
     * 
     */
    create<T extends SpaceCreateArgs>(args: SelectSubset<T, SpaceCreateArgs<ExtArgs>>): Prisma__SpaceClient<$Result.GetResult<Prisma.$SpacePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Spaces.
     * @param {SpaceCreateManyArgs} args - Arguments to create many Spaces.
     * @example
     * // Create many Spaces
     * const space = await prisma.space.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SpaceCreateManyArgs>(args?: SelectSubset<T, SpaceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Spaces and returns the data saved in the database.
     * @param {SpaceCreateManyAndReturnArgs} args - Arguments to create many Spaces.
     * @example
     * // Create many Spaces
     * const space = await prisma.space.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Spaces and only return the `id`
     * const spaceWithIdOnly = await prisma.space.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SpaceCreateManyAndReturnArgs>(args?: SelectSubset<T, SpaceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SpacePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Space.
     * @param {SpaceDeleteArgs} args - Arguments to delete one Space.
     * @example
     * // Delete one Space
     * const Space = await prisma.space.delete({
     *   where: {
     *     // ... filter to delete one Space
     *   }
     * })
     * 
     */
    delete<T extends SpaceDeleteArgs>(args: SelectSubset<T, SpaceDeleteArgs<ExtArgs>>): Prisma__SpaceClient<$Result.GetResult<Prisma.$SpacePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Space.
     * @param {SpaceUpdateArgs} args - Arguments to update one Space.
     * @example
     * // Update one Space
     * const space = await prisma.space.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SpaceUpdateArgs>(args: SelectSubset<T, SpaceUpdateArgs<ExtArgs>>): Prisma__SpaceClient<$Result.GetResult<Prisma.$SpacePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Spaces.
     * @param {SpaceDeleteManyArgs} args - Arguments to filter Spaces to delete.
     * @example
     * // Delete a few Spaces
     * const { count } = await prisma.space.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SpaceDeleteManyArgs>(args?: SelectSubset<T, SpaceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Spaces.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SpaceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Spaces
     * const space = await prisma.space.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SpaceUpdateManyArgs>(args: SelectSubset<T, SpaceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Spaces and returns the data updated in the database.
     * @param {SpaceUpdateManyAndReturnArgs} args - Arguments to update many Spaces.
     * @example
     * // Update many Spaces
     * const space = await prisma.space.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Spaces and only return the `id`
     * const spaceWithIdOnly = await prisma.space.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SpaceUpdateManyAndReturnArgs>(args: SelectSubset<T, SpaceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SpacePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Space.
     * @param {SpaceUpsertArgs} args - Arguments to update or create a Space.
     * @example
     * // Update or create a Space
     * const space = await prisma.space.upsert({
     *   create: {
     *     // ... data to create a Space
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Space we want to update
     *   }
     * })
     */
    upsert<T extends SpaceUpsertArgs>(args: SelectSubset<T, SpaceUpsertArgs<ExtArgs>>): Prisma__SpaceClient<$Result.GetResult<Prisma.$SpacePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Spaces.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SpaceCountArgs} args - Arguments to filter Spaces to count.
     * @example
     * // Count the number of Spaces
     * const count = await prisma.space.count({
     *   where: {
     *     // ... the filter for the Spaces we want to count
     *   }
     * })
    **/
    count<T extends SpaceCountArgs>(
      args?: Subset<T, SpaceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SpaceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Space.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SpaceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SpaceAggregateArgs>(args: Subset<T, SpaceAggregateArgs>): Prisma.PrismaPromise<GetSpaceAggregateType<T>>

    /**
     * Group by Space.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SpaceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SpaceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SpaceGroupByArgs['orderBy'] }
        : { orderBy?: SpaceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SpaceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSpaceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Space model
   */
  readonly fields: SpaceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Space.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SpaceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    creator<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    elements<T extends Space$elementsArgs<ExtArgs> = {}>(args?: Subset<T, Space$elementsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$spaceElementsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Space model
   */
  interface SpaceFieldRefs {
    readonly id: FieldRef<"Space", 'String'>
    readonly name: FieldRef<"Space", 'String'>
    readonly width: FieldRef<"Space", 'Int'>
    readonly height: FieldRef<"Space", 'Int'>
    readonly thumbnail: FieldRef<"Space", 'String'>
    readonly creatorId: FieldRef<"Space", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Space findUnique
   */
  export type SpaceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Space
     */
    select?: SpaceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Space
     */
    omit?: SpaceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpaceInclude<ExtArgs> | null
    /**
     * Filter, which Space to fetch.
     */
    where: SpaceWhereUniqueInput
  }

  /**
   * Space findUniqueOrThrow
   */
  export type SpaceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Space
     */
    select?: SpaceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Space
     */
    omit?: SpaceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpaceInclude<ExtArgs> | null
    /**
     * Filter, which Space to fetch.
     */
    where: SpaceWhereUniqueInput
  }

  /**
   * Space findFirst
   */
  export type SpaceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Space
     */
    select?: SpaceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Space
     */
    omit?: SpaceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpaceInclude<ExtArgs> | null
    /**
     * Filter, which Space to fetch.
     */
    where?: SpaceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Spaces to fetch.
     */
    orderBy?: SpaceOrderByWithRelationInput | SpaceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Spaces.
     */
    cursor?: SpaceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Spaces from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Spaces.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Spaces.
     */
    distinct?: SpaceScalarFieldEnum | SpaceScalarFieldEnum[]
  }

  /**
   * Space findFirstOrThrow
   */
  export type SpaceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Space
     */
    select?: SpaceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Space
     */
    omit?: SpaceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpaceInclude<ExtArgs> | null
    /**
     * Filter, which Space to fetch.
     */
    where?: SpaceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Spaces to fetch.
     */
    orderBy?: SpaceOrderByWithRelationInput | SpaceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Spaces.
     */
    cursor?: SpaceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Spaces from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Spaces.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Spaces.
     */
    distinct?: SpaceScalarFieldEnum | SpaceScalarFieldEnum[]
  }

  /**
   * Space findMany
   */
  export type SpaceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Space
     */
    select?: SpaceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Space
     */
    omit?: SpaceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpaceInclude<ExtArgs> | null
    /**
     * Filter, which Spaces to fetch.
     */
    where?: SpaceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Spaces to fetch.
     */
    orderBy?: SpaceOrderByWithRelationInput | SpaceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Spaces.
     */
    cursor?: SpaceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Spaces from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Spaces.
     */
    skip?: number
    distinct?: SpaceScalarFieldEnum | SpaceScalarFieldEnum[]
  }

  /**
   * Space create
   */
  export type SpaceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Space
     */
    select?: SpaceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Space
     */
    omit?: SpaceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpaceInclude<ExtArgs> | null
    /**
     * The data needed to create a Space.
     */
    data: XOR<SpaceCreateInput, SpaceUncheckedCreateInput>
  }

  /**
   * Space createMany
   */
  export type SpaceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Spaces.
     */
    data: SpaceCreateManyInput | SpaceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Space createManyAndReturn
   */
  export type SpaceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Space
     */
    select?: SpaceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Space
     */
    omit?: SpaceOmit<ExtArgs> | null
    /**
     * The data used to create many Spaces.
     */
    data: SpaceCreateManyInput | SpaceCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpaceIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Space update
   */
  export type SpaceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Space
     */
    select?: SpaceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Space
     */
    omit?: SpaceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpaceInclude<ExtArgs> | null
    /**
     * The data needed to update a Space.
     */
    data: XOR<SpaceUpdateInput, SpaceUncheckedUpdateInput>
    /**
     * Choose, which Space to update.
     */
    where: SpaceWhereUniqueInput
  }

  /**
   * Space updateMany
   */
  export type SpaceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Spaces.
     */
    data: XOR<SpaceUpdateManyMutationInput, SpaceUncheckedUpdateManyInput>
    /**
     * Filter which Spaces to update
     */
    where?: SpaceWhereInput
    /**
     * Limit how many Spaces to update.
     */
    limit?: number
  }

  /**
   * Space updateManyAndReturn
   */
  export type SpaceUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Space
     */
    select?: SpaceSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Space
     */
    omit?: SpaceOmit<ExtArgs> | null
    /**
     * The data used to update Spaces.
     */
    data: XOR<SpaceUpdateManyMutationInput, SpaceUncheckedUpdateManyInput>
    /**
     * Filter which Spaces to update
     */
    where?: SpaceWhereInput
    /**
     * Limit how many Spaces to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpaceIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Space upsert
   */
  export type SpaceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Space
     */
    select?: SpaceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Space
     */
    omit?: SpaceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpaceInclude<ExtArgs> | null
    /**
     * The filter to search for the Space to update in case it exists.
     */
    where: SpaceWhereUniqueInput
    /**
     * In case the Space found by the `where` argument doesn't exist, create a new Space with this data.
     */
    create: XOR<SpaceCreateInput, SpaceUncheckedCreateInput>
    /**
     * In case the Space was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SpaceUpdateInput, SpaceUncheckedUpdateInput>
  }

  /**
   * Space delete
   */
  export type SpaceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Space
     */
    select?: SpaceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Space
     */
    omit?: SpaceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpaceInclude<ExtArgs> | null
    /**
     * Filter which Space to delete.
     */
    where: SpaceWhereUniqueInput
  }

  /**
   * Space deleteMany
   */
  export type SpaceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Spaces to delete
     */
    where?: SpaceWhereInput
    /**
     * Limit how many Spaces to delete.
     */
    limit?: number
  }

  /**
   * Space.elements
   */
  export type Space$elementsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the spaceElements
     */
    select?: spaceElementsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the spaceElements
     */
    omit?: spaceElementsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: spaceElementsInclude<ExtArgs> | null
    where?: spaceElementsWhereInput
    orderBy?: spaceElementsOrderByWithRelationInput | spaceElementsOrderByWithRelationInput[]
    cursor?: spaceElementsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SpaceElementsScalarFieldEnum | SpaceElementsScalarFieldEnum[]
  }

  /**
   * Space without action
   */
  export type SpaceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Space
     */
    select?: SpaceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Space
     */
    omit?: SpaceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpaceInclude<ExtArgs> | null
  }


  /**
   * Model spaceElements
   */

  export type AggregateSpaceElements = {
    _count: SpaceElementsCountAggregateOutputType | null
    _avg: SpaceElementsAvgAggregateOutputType | null
    _sum: SpaceElementsSumAggregateOutputType | null
    _min: SpaceElementsMinAggregateOutputType | null
    _max: SpaceElementsMaxAggregateOutputType | null
  }

  export type SpaceElementsAvgAggregateOutputType = {
    x: number | null
    y: number | null
  }

  export type SpaceElementsSumAggregateOutputType = {
    x: number | null
    y: number | null
  }

  export type SpaceElementsMinAggregateOutputType = {
    id: string | null
    elementId: string | null
    spaceId: string | null
    x: number | null
    y: number | null
  }

  export type SpaceElementsMaxAggregateOutputType = {
    id: string | null
    elementId: string | null
    spaceId: string | null
    x: number | null
    y: number | null
  }

  export type SpaceElementsCountAggregateOutputType = {
    id: number
    elementId: number
    spaceId: number
    x: number
    y: number
    _all: number
  }


  export type SpaceElementsAvgAggregateInputType = {
    x?: true
    y?: true
  }

  export type SpaceElementsSumAggregateInputType = {
    x?: true
    y?: true
  }

  export type SpaceElementsMinAggregateInputType = {
    id?: true
    elementId?: true
    spaceId?: true
    x?: true
    y?: true
  }

  export type SpaceElementsMaxAggregateInputType = {
    id?: true
    elementId?: true
    spaceId?: true
    x?: true
    y?: true
  }

  export type SpaceElementsCountAggregateInputType = {
    id?: true
    elementId?: true
    spaceId?: true
    x?: true
    y?: true
    _all?: true
  }

  export type SpaceElementsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which spaceElements to aggregate.
     */
    where?: spaceElementsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of spaceElements to fetch.
     */
    orderBy?: spaceElementsOrderByWithRelationInput | spaceElementsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: spaceElementsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` spaceElements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` spaceElements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned spaceElements
    **/
    _count?: true | SpaceElementsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SpaceElementsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SpaceElementsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SpaceElementsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SpaceElementsMaxAggregateInputType
  }

  export type GetSpaceElementsAggregateType<T extends SpaceElementsAggregateArgs> = {
        [P in keyof T & keyof AggregateSpaceElements]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSpaceElements[P]>
      : GetScalarType<T[P], AggregateSpaceElements[P]>
  }




  export type spaceElementsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: spaceElementsWhereInput
    orderBy?: spaceElementsOrderByWithAggregationInput | spaceElementsOrderByWithAggregationInput[]
    by: SpaceElementsScalarFieldEnum[] | SpaceElementsScalarFieldEnum
    having?: spaceElementsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SpaceElementsCountAggregateInputType | true
    _avg?: SpaceElementsAvgAggregateInputType
    _sum?: SpaceElementsSumAggregateInputType
    _min?: SpaceElementsMinAggregateInputType
    _max?: SpaceElementsMaxAggregateInputType
  }

  export type SpaceElementsGroupByOutputType = {
    id: string
    elementId: string
    spaceId: string
    x: number
    y: number
    _count: SpaceElementsCountAggregateOutputType | null
    _avg: SpaceElementsAvgAggregateOutputType | null
    _sum: SpaceElementsSumAggregateOutputType | null
    _min: SpaceElementsMinAggregateOutputType | null
    _max: SpaceElementsMaxAggregateOutputType | null
  }

  type GetSpaceElementsGroupByPayload<T extends spaceElementsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SpaceElementsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SpaceElementsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SpaceElementsGroupByOutputType[P]>
            : GetScalarType<T[P], SpaceElementsGroupByOutputType[P]>
        }
      >
    >


  export type spaceElementsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    elementId?: boolean
    spaceId?: boolean
    x?: boolean
    y?: boolean
    space?: boolean | SpaceDefaultArgs<ExtArgs>
    element?: boolean | ElementDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["spaceElements"]>

  export type spaceElementsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    elementId?: boolean
    spaceId?: boolean
    x?: boolean
    y?: boolean
    space?: boolean | SpaceDefaultArgs<ExtArgs>
    element?: boolean | ElementDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["spaceElements"]>

  export type spaceElementsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    elementId?: boolean
    spaceId?: boolean
    x?: boolean
    y?: boolean
    space?: boolean | SpaceDefaultArgs<ExtArgs>
    element?: boolean | ElementDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["spaceElements"]>

  export type spaceElementsSelectScalar = {
    id?: boolean
    elementId?: boolean
    spaceId?: boolean
    x?: boolean
    y?: boolean
  }

  export type spaceElementsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "elementId" | "spaceId" | "x" | "y", ExtArgs["result"]["spaceElements"]>
  export type spaceElementsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    space?: boolean | SpaceDefaultArgs<ExtArgs>
    element?: boolean | ElementDefaultArgs<ExtArgs>
  }
  export type spaceElementsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    space?: boolean | SpaceDefaultArgs<ExtArgs>
    element?: boolean | ElementDefaultArgs<ExtArgs>
  }
  export type spaceElementsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    space?: boolean | SpaceDefaultArgs<ExtArgs>
    element?: boolean | ElementDefaultArgs<ExtArgs>
  }

  export type $spaceElementsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "spaceElements"
    objects: {
      space: Prisma.$SpacePayload<ExtArgs>
      element: Prisma.$ElementPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      elementId: string
      spaceId: string
      x: number
      y: number
    }, ExtArgs["result"]["spaceElements"]>
    composites: {}
  }

  type spaceElementsGetPayload<S extends boolean | null | undefined | spaceElementsDefaultArgs> = $Result.GetResult<Prisma.$spaceElementsPayload, S>

  type spaceElementsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<spaceElementsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SpaceElementsCountAggregateInputType | true
    }

  export interface spaceElementsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['spaceElements'], meta: { name: 'spaceElements' } }
    /**
     * Find zero or one SpaceElements that matches the filter.
     * @param {spaceElementsFindUniqueArgs} args - Arguments to find a SpaceElements
     * @example
     * // Get one SpaceElements
     * const spaceElements = await prisma.spaceElements.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends spaceElementsFindUniqueArgs>(args: SelectSubset<T, spaceElementsFindUniqueArgs<ExtArgs>>): Prisma__spaceElementsClient<$Result.GetResult<Prisma.$spaceElementsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SpaceElements that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {spaceElementsFindUniqueOrThrowArgs} args - Arguments to find a SpaceElements
     * @example
     * // Get one SpaceElements
     * const spaceElements = await prisma.spaceElements.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends spaceElementsFindUniqueOrThrowArgs>(args: SelectSubset<T, spaceElementsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__spaceElementsClient<$Result.GetResult<Prisma.$spaceElementsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SpaceElements that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {spaceElementsFindFirstArgs} args - Arguments to find a SpaceElements
     * @example
     * // Get one SpaceElements
     * const spaceElements = await prisma.spaceElements.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends spaceElementsFindFirstArgs>(args?: SelectSubset<T, spaceElementsFindFirstArgs<ExtArgs>>): Prisma__spaceElementsClient<$Result.GetResult<Prisma.$spaceElementsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SpaceElements that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {spaceElementsFindFirstOrThrowArgs} args - Arguments to find a SpaceElements
     * @example
     * // Get one SpaceElements
     * const spaceElements = await prisma.spaceElements.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends spaceElementsFindFirstOrThrowArgs>(args?: SelectSubset<T, spaceElementsFindFirstOrThrowArgs<ExtArgs>>): Prisma__spaceElementsClient<$Result.GetResult<Prisma.$spaceElementsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SpaceElements that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {spaceElementsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SpaceElements
     * const spaceElements = await prisma.spaceElements.findMany()
     * 
     * // Get first 10 SpaceElements
     * const spaceElements = await prisma.spaceElements.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const spaceElementsWithIdOnly = await prisma.spaceElements.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends spaceElementsFindManyArgs>(args?: SelectSubset<T, spaceElementsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$spaceElementsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SpaceElements.
     * @param {spaceElementsCreateArgs} args - Arguments to create a SpaceElements.
     * @example
     * // Create one SpaceElements
     * const SpaceElements = await prisma.spaceElements.create({
     *   data: {
     *     // ... data to create a SpaceElements
     *   }
     * })
     * 
     */
    create<T extends spaceElementsCreateArgs>(args: SelectSubset<T, spaceElementsCreateArgs<ExtArgs>>): Prisma__spaceElementsClient<$Result.GetResult<Prisma.$spaceElementsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SpaceElements.
     * @param {spaceElementsCreateManyArgs} args - Arguments to create many SpaceElements.
     * @example
     * // Create many SpaceElements
     * const spaceElements = await prisma.spaceElements.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends spaceElementsCreateManyArgs>(args?: SelectSubset<T, spaceElementsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SpaceElements and returns the data saved in the database.
     * @param {spaceElementsCreateManyAndReturnArgs} args - Arguments to create many SpaceElements.
     * @example
     * // Create many SpaceElements
     * const spaceElements = await prisma.spaceElements.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SpaceElements and only return the `id`
     * const spaceElementsWithIdOnly = await prisma.spaceElements.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends spaceElementsCreateManyAndReturnArgs>(args?: SelectSubset<T, spaceElementsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$spaceElementsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SpaceElements.
     * @param {spaceElementsDeleteArgs} args - Arguments to delete one SpaceElements.
     * @example
     * // Delete one SpaceElements
     * const SpaceElements = await prisma.spaceElements.delete({
     *   where: {
     *     // ... filter to delete one SpaceElements
     *   }
     * })
     * 
     */
    delete<T extends spaceElementsDeleteArgs>(args: SelectSubset<T, spaceElementsDeleteArgs<ExtArgs>>): Prisma__spaceElementsClient<$Result.GetResult<Prisma.$spaceElementsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SpaceElements.
     * @param {spaceElementsUpdateArgs} args - Arguments to update one SpaceElements.
     * @example
     * // Update one SpaceElements
     * const spaceElements = await prisma.spaceElements.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends spaceElementsUpdateArgs>(args: SelectSubset<T, spaceElementsUpdateArgs<ExtArgs>>): Prisma__spaceElementsClient<$Result.GetResult<Prisma.$spaceElementsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SpaceElements.
     * @param {spaceElementsDeleteManyArgs} args - Arguments to filter SpaceElements to delete.
     * @example
     * // Delete a few SpaceElements
     * const { count } = await prisma.spaceElements.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends spaceElementsDeleteManyArgs>(args?: SelectSubset<T, spaceElementsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SpaceElements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {spaceElementsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SpaceElements
     * const spaceElements = await prisma.spaceElements.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends spaceElementsUpdateManyArgs>(args: SelectSubset<T, spaceElementsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SpaceElements and returns the data updated in the database.
     * @param {spaceElementsUpdateManyAndReturnArgs} args - Arguments to update many SpaceElements.
     * @example
     * // Update many SpaceElements
     * const spaceElements = await prisma.spaceElements.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SpaceElements and only return the `id`
     * const spaceElementsWithIdOnly = await prisma.spaceElements.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends spaceElementsUpdateManyAndReturnArgs>(args: SelectSubset<T, spaceElementsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$spaceElementsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SpaceElements.
     * @param {spaceElementsUpsertArgs} args - Arguments to update or create a SpaceElements.
     * @example
     * // Update or create a SpaceElements
     * const spaceElements = await prisma.spaceElements.upsert({
     *   create: {
     *     // ... data to create a SpaceElements
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SpaceElements we want to update
     *   }
     * })
     */
    upsert<T extends spaceElementsUpsertArgs>(args: SelectSubset<T, spaceElementsUpsertArgs<ExtArgs>>): Prisma__spaceElementsClient<$Result.GetResult<Prisma.$spaceElementsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SpaceElements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {spaceElementsCountArgs} args - Arguments to filter SpaceElements to count.
     * @example
     * // Count the number of SpaceElements
     * const count = await prisma.spaceElements.count({
     *   where: {
     *     // ... the filter for the SpaceElements we want to count
     *   }
     * })
    **/
    count<T extends spaceElementsCountArgs>(
      args?: Subset<T, spaceElementsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SpaceElementsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SpaceElements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SpaceElementsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SpaceElementsAggregateArgs>(args: Subset<T, SpaceElementsAggregateArgs>): Prisma.PrismaPromise<GetSpaceElementsAggregateType<T>>

    /**
     * Group by SpaceElements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {spaceElementsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends spaceElementsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: spaceElementsGroupByArgs['orderBy'] }
        : { orderBy?: spaceElementsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, spaceElementsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSpaceElementsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the spaceElements model
   */
  readonly fields: spaceElementsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for spaceElements.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__spaceElementsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    space<T extends SpaceDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SpaceDefaultArgs<ExtArgs>>): Prisma__SpaceClient<$Result.GetResult<Prisma.$SpacePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    element<T extends ElementDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ElementDefaultArgs<ExtArgs>>): Prisma__ElementClient<$Result.GetResult<Prisma.$ElementPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the spaceElements model
   */
  interface spaceElementsFieldRefs {
    readonly id: FieldRef<"spaceElements", 'String'>
    readonly elementId: FieldRef<"spaceElements", 'String'>
    readonly spaceId: FieldRef<"spaceElements", 'String'>
    readonly x: FieldRef<"spaceElements", 'Int'>
    readonly y: FieldRef<"spaceElements", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * spaceElements findUnique
   */
  export type spaceElementsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the spaceElements
     */
    select?: spaceElementsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the spaceElements
     */
    omit?: spaceElementsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: spaceElementsInclude<ExtArgs> | null
    /**
     * Filter, which spaceElements to fetch.
     */
    where: spaceElementsWhereUniqueInput
  }

  /**
   * spaceElements findUniqueOrThrow
   */
  export type spaceElementsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the spaceElements
     */
    select?: spaceElementsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the spaceElements
     */
    omit?: spaceElementsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: spaceElementsInclude<ExtArgs> | null
    /**
     * Filter, which spaceElements to fetch.
     */
    where: spaceElementsWhereUniqueInput
  }

  /**
   * spaceElements findFirst
   */
  export type spaceElementsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the spaceElements
     */
    select?: spaceElementsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the spaceElements
     */
    omit?: spaceElementsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: spaceElementsInclude<ExtArgs> | null
    /**
     * Filter, which spaceElements to fetch.
     */
    where?: spaceElementsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of spaceElements to fetch.
     */
    orderBy?: spaceElementsOrderByWithRelationInput | spaceElementsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for spaceElements.
     */
    cursor?: spaceElementsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` spaceElements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` spaceElements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of spaceElements.
     */
    distinct?: SpaceElementsScalarFieldEnum | SpaceElementsScalarFieldEnum[]
  }

  /**
   * spaceElements findFirstOrThrow
   */
  export type spaceElementsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the spaceElements
     */
    select?: spaceElementsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the spaceElements
     */
    omit?: spaceElementsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: spaceElementsInclude<ExtArgs> | null
    /**
     * Filter, which spaceElements to fetch.
     */
    where?: spaceElementsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of spaceElements to fetch.
     */
    orderBy?: spaceElementsOrderByWithRelationInput | spaceElementsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for spaceElements.
     */
    cursor?: spaceElementsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` spaceElements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` spaceElements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of spaceElements.
     */
    distinct?: SpaceElementsScalarFieldEnum | SpaceElementsScalarFieldEnum[]
  }

  /**
   * spaceElements findMany
   */
  export type spaceElementsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the spaceElements
     */
    select?: spaceElementsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the spaceElements
     */
    omit?: spaceElementsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: spaceElementsInclude<ExtArgs> | null
    /**
     * Filter, which spaceElements to fetch.
     */
    where?: spaceElementsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of spaceElements to fetch.
     */
    orderBy?: spaceElementsOrderByWithRelationInput | spaceElementsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing spaceElements.
     */
    cursor?: spaceElementsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` spaceElements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` spaceElements.
     */
    skip?: number
    distinct?: SpaceElementsScalarFieldEnum | SpaceElementsScalarFieldEnum[]
  }

  /**
   * spaceElements create
   */
  export type spaceElementsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the spaceElements
     */
    select?: spaceElementsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the spaceElements
     */
    omit?: spaceElementsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: spaceElementsInclude<ExtArgs> | null
    /**
     * The data needed to create a spaceElements.
     */
    data: XOR<spaceElementsCreateInput, spaceElementsUncheckedCreateInput>
  }

  /**
   * spaceElements createMany
   */
  export type spaceElementsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many spaceElements.
     */
    data: spaceElementsCreateManyInput | spaceElementsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * spaceElements createManyAndReturn
   */
  export type spaceElementsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the spaceElements
     */
    select?: spaceElementsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the spaceElements
     */
    omit?: spaceElementsOmit<ExtArgs> | null
    /**
     * The data used to create many spaceElements.
     */
    data: spaceElementsCreateManyInput | spaceElementsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: spaceElementsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * spaceElements update
   */
  export type spaceElementsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the spaceElements
     */
    select?: spaceElementsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the spaceElements
     */
    omit?: spaceElementsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: spaceElementsInclude<ExtArgs> | null
    /**
     * The data needed to update a spaceElements.
     */
    data: XOR<spaceElementsUpdateInput, spaceElementsUncheckedUpdateInput>
    /**
     * Choose, which spaceElements to update.
     */
    where: spaceElementsWhereUniqueInput
  }

  /**
   * spaceElements updateMany
   */
  export type spaceElementsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update spaceElements.
     */
    data: XOR<spaceElementsUpdateManyMutationInput, spaceElementsUncheckedUpdateManyInput>
    /**
     * Filter which spaceElements to update
     */
    where?: spaceElementsWhereInput
    /**
     * Limit how many spaceElements to update.
     */
    limit?: number
  }

  /**
   * spaceElements updateManyAndReturn
   */
  export type spaceElementsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the spaceElements
     */
    select?: spaceElementsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the spaceElements
     */
    omit?: spaceElementsOmit<ExtArgs> | null
    /**
     * The data used to update spaceElements.
     */
    data: XOR<spaceElementsUpdateManyMutationInput, spaceElementsUncheckedUpdateManyInput>
    /**
     * Filter which spaceElements to update
     */
    where?: spaceElementsWhereInput
    /**
     * Limit how many spaceElements to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: spaceElementsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * spaceElements upsert
   */
  export type spaceElementsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the spaceElements
     */
    select?: spaceElementsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the spaceElements
     */
    omit?: spaceElementsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: spaceElementsInclude<ExtArgs> | null
    /**
     * The filter to search for the spaceElements to update in case it exists.
     */
    where: spaceElementsWhereUniqueInput
    /**
     * In case the spaceElements found by the `where` argument doesn't exist, create a new spaceElements with this data.
     */
    create: XOR<spaceElementsCreateInput, spaceElementsUncheckedCreateInput>
    /**
     * In case the spaceElements was found with the provided `where` argument, update it with this data.
     */
    update: XOR<spaceElementsUpdateInput, spaceElementsUncheckedUpdateInput>
  }

  /**
   * spaceElements delete
   */
  export type spaceElementsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the spaceElements
     */
    select?: spaceElementsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the spaceElements
     */
    omit?: spaceElementsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: spaceElementsInclude<ExtArgs> | null
    /**
     * Filter which spaceElements to delete.
     */
    where: spaceElementsWhereUniqueInput
  }

  /**
   * spaceElements deleteMany
   */
  export type spaceElementsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which spaceElements to delete
     */
    where?: spaceElementsWhereInput
    /**
     * Limit how many spaceElements to delete.
     */
    limit?: number
  }

  /**
   * spaceElements without action
   */
  export type spaceElementsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the spaceElements
     */
    select?: spaceElementsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the spaceElements
     */
    omit?: spaceElementsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: spaceElementsInclude<ExtArgs> | null
  }


  /**
   * Model Element
   */

  export type AggregateElement = {
    _count: ElementCountAggregateOutputType | null
    _avg: ElementAvgAggregateOutputType | null
    _sum: ElementSumAggregateOutputType | null
    _min: ElementMinAggregateOutputType | null
    _max: ElementMaxAggregateOutputType | null
  }

  export type ElementAvgAggregateOutputType = {
    width: number | null
    height: number | null
  }

  export type ElementSumAggregateOutputType = {
    width: number | null
    height: number | null
  }

  export type ElementMinAggregateOutputType = {
    id: string | null
    width: number | null
    height: number | null
    imageUrl: string | null
  }

  export type ElementMaxAggregateOutputType = {
    id: string | null
    width: number | null
    height: number | null
    imageUrl: string | null
  }

  export type ElementCountAggregateOutputType = {
    id: number
    width: number
    height: number
    imageUrl: number
    _all: number
  }


  export type ElementAvgAggregateInputType = {
    width?: true
    height?: true
  }

  export type ElementSumAggregateInputType = {
    width?: true
    height?: true
  }

  export type ElementMinAggregateInputType = {
    id?: true
    width?: true
    height?: true
    imageUrl?: true
  }

  export type ElementMaxAggregateInputType = {
    id?: true
    width?: true
    height?: true
    imageUrl?: true
  }

  export type ElementCountAggregateInputType = {
    id?: true
    width?: true
    height?: true
    imageUrl?: true
    _all?: true
  }

  export type ElementAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Element to aggregate.
     */
    where?: ElementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Elements to fetch.
     */
    orderBy?: ElementOrderByWithRelationInput | ElementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ElementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Elements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Elements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Elements
    **/
    _count?: true | ElementCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ElementAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ElementSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ElementMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ElementMaxAggregateInputType
  }

  export type GetElementAggregateType<T extends ElementAggregateArgs> = {
        [P in keyof T & keyof AggregateElement]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateElement[P]>
      : GetScalarType<T[P], AggregateElement[P]>
  }




  export type ElementGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ElementWhereInput
    orderBy?: ElementOrderByWithAggregationInput | ElementOrderByWithAggregationInput[]
    by: ElementScalarFieldEnum[] | ElementScalarFieldEnum
    having?: ElementScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ElementCountAggregateInputType | true
    _avg?: ElementAvgAggregateInputType
    _sum?: ElementSumAggregateInputType
    _min?: ElementMinAggregateInputType
    _max?: ElementMaxAggregateInputType
  }

  export type ElementGroupByOutputType = {
    id: string
    width: number
    height: number
    imageUrl: string
    _count: ElementCountAggregateOutputType | null
    _avg: ElementAvgAggregateOutputType | null
    _sum: ElementSumAggregateOutputType | null
    _min: ElementMinAggregateOutputType | null
    _max: ElementMaxAggregateOutputType | null
  }

  type GetElementGroupByPayload<T extends ElementGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ElementGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ElementGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ElementGroupByOutputType[P]>
            : GetScalarType<T[P], ElementGroupByOutputType[P]>
        }
      >
    >


  export type ElementSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    width?: boolean
    height?: boolean
    imageUrl?: boolean
    spaces?: boolean | Element$spacesArgs<ExtArgs>
    mapElements?: boolean | Element$mapElementsArgs<ExtArgs>
    _count?: boolean | ElementCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["element"]>

  export type ElementSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    width?: boolean
    height?: boolean
    imageUrl?: boolean
  }, ExtArgs["result"]["element"]>

  export type ElementSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    width?: boolean
    height?: boolean
    imageUrl?: boolean
  }, ExtArgs["result"]["element"]>

  export type ElementSelectScalar = {
    id?: boolean
    width?: boolean
    height?: boolean
    imageUrl?: boolean
  }

  export type ElementOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "width" | "height" | "imageUrl", ExtArgs["result"]["element"]>
  export type ElementInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    spaces?: boolean | Element$spacesArgs<ExtArgs>
    mapElements?: boolean | Element$mapElementsArgs<ExtArgs>
    _count?: boolean | ElementCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ElementIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ElementIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ElementPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Element"
    objects: {
      spaces: Prisma.$spaceElementsPayload<ExtArgs>[]
      mapElements: Prisma.$MapElementsPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      width: number
      height: number
      imageUrl: string
    }, ExtArgs["result"]["element"]>
    composites: {}
  }

  type ElementGetPayload<S extends boolean | null | undefined | ElementDefaultArgs> = $Result.GetResult<Prisma.$ElementPayload, S>

  type ElementCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ElementFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ElementCountAggregateInputType | true
    }

  export interface ElementDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Element'], meta: { name: 'Element' } }
    /**
     * Find zero or one Element that matches the filter.
     * @param {ElementFindUniqueArgs} args - Arguments to find a Element
     * @example
     * // Get one Element
     * const element = await prisma.element.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ElementFindUniqueArgs>(args: SelectSubset<T, ElementFindUniqueArgs<ExtArgs>>): Prisma__ElementClient<$Result.GetResult<Prisma.$ElementPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Element that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ElementFindUniqueOrThrowArgs} args - Arguments to find a Element
     * @example
     * // Get one Element
     * const element = await prisma.element.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ElementFindUniqueOrThrowArgs>(args: SelectSubset<T, ElementFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ElementClient<$Result.GetResult<Prisma.$ElementPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Element that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ElementFindFirstArgs} args - Arguments to find a Element
     * @example
     * // Get one Element
     * const element = await prisma.element.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ElementFindFirstArgs>(args?: SelectSubset<T, ElementFindFirstArgs<ExtArgs>>): Prisma__ElementClient<$Result.GetResult<Prisma.$ElementPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Element that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ElementFindFirstOrThrowArgs} args - Arguments to find a Element
     * @example
     * // Get one Element
     * const element = await prisma.element.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ElementFindFirstOrThrowArgs>(args?: SelectSubset<T, ElementFindFirstOrThrowArgs<ExtArgs>>): Prisma__ElementClient<$Result.GetResult<Prisma.$ElementPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Elements that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ElementFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Elements
     * const elements = await prisma.element.findMany()
     * 
     * // Get first 10 Elements
     * const elements = await prisma.element.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const elementWithIdOnly = await prisma.element.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ElementFindManyArgs>(args?: SelectSubset<T, ElementFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ElementPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Element.
     * @param {ElementCreateArgs} args - Arguments to create a Element.
     * @example
     * // Create one Element
     * const Element = await prisma.element.create({
     *   data: {
     *     // ... data to create a Element
     *   }
     * })
     * 
     */
    create<T extends ElementCreateArgs>(args: SelectSubset<T, ElementCreateArgs<ExtArgs>>): Prisma__ElementClient<$Result.GetResult<Prisma.$ElementPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Elements.
     * @param {ElementCreateManyArgs} args - Arguments to create many Elements.
     * @example
     * // Create many Elements
     * const element = await prisma.element.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ElementCreateManyArgs>(args?: SelectSubset<T, ElementCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Elements and returns the data saved in the database.
     * @param {ElementCreateManyAndReturnArgs} args - Arguments to create many Elements.
     * @example
     * // Create many Elements
     * const element = await prisma.element.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Elements and only return the `id`
     * const elementWithIdOnly = await prisma.element.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ElementCreateManyAndReturnArgs>(args?: SelectSubset<T, ElementCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ElementPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Element.
     * @param {ElementDeleteArgs} args - Arguments to delete one Element.
     * @example
     * // Delete one Element
     * const Element = await prisma.element.delete({
     *   where: {
     *     // ... filter to delete one Element
     *   }
     * })
     * 
     */
    delete<T extends ElementDeleteArgs>(args: SelectSubset<T, ElementDeleteArgs<ExtArgs>>): Prisma__ElementClient<$Result.GetResult<Prisma.$ElementPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Element.
     * @param {ElementUpdateArgs} args - Arguments to update one Element.
     * @example
     * // Update one Element
     * const element = await prisma.element.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ElementUpdateArgs>(args: SelectSubset<T, ElementUpdateArgs<ExtArgs>>): Prisma__ElementClient<$Result.GetResult<Prisma.$ElementPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Elements.
     * @param {ElementDeleteManyArgs} args - Arguments to filter Elements to delete.
     * @example
     * // Delete a few Elements
     * const { count } = await prisma.element.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ElementDeleteManyArgs>(args?: SelectSubset<T, ElementDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Elements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ElementUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Elements
     * const element = await prisma.element.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ElementUpdateManyArgs>(args: SelectSubset<T, ElementUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Elements and returns the data updated in the database.
     * @param {ElementUpdateManyAndReturnArgs} args - Arguments to update many Elements.
     * @example
     * // Update many Elements
     * const element = await prisma.element.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Elements and only return the `id`
     * const elementWithIdOnly = await prisma.element.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ElementUpdateManyAndReturnArgs>(args: SelectSubset<T, ElementUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ElementPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Element.
     * @param {ElementUpsertArgs} args - Arguments to update or create a Element.
     * @example
     * // Update or create a Element
     * const element = await prisma.element.upsert({
     *   create: {
     *     // ... data to create a Element
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Element we want to update
     *   }
     * })
     */
    upsert<T extends ElementUpsertArgs>(args: SelectSubset<T, ElementUpsertArgs<ExtArgs>>): Prisma__ElementClient<$Result.GetResult<Prisma.$ElementPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Elements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ElementCountArgs} args - Arguments to filter Elements to count.
     * @example
     * // Count the number of Elements
     * const count = await prisma.element.count({
     *   where: {
     *     // ... the filter for the Elements we want to count
     *   }
     * })
    **/
    count<T extends ElementCountArgs>(
      args?: Subset<T, ElementCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ElementCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Element.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ElementAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ElementAggregateArgs>(args: Subset<T, ElementAggregateArgs>): Prisma.PrismaPromise<GetElementAggregateType<T>>

    /**
     * Group by Element.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ElementGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ElementGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ElementGroupByArgs['orderBy'] }
        : { orderBy?: ElementGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ElementGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetElementGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Element model
   */
  readonly fields: ElementFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Element.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ElementClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    spaces<T extends Element$spacesArgs<ExtArgs> = {}>(args?: Subset<T, Element$spacesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$spaceElementsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    mapElements<T extends Element$mapElementsArgs<ExtArgs> = {}>(args?: Subset<T, Element$mapElementsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MapElementsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Element model
   */
  interface ElementFieldRefs {
    readonly id: FieldRef<"Element", 'String'>
    readonly width: FieldRef<"Element", 'Int'>
    readonly height: FieldRef<"Element", 'Int'>
    readonly imageUrl: FieldRef<"Element", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Element findUnique
   */
  export type ElementFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Element
     */
    select?: ElementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Element
     */
    omit?: ElementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ElementInclude<ExtArgs> | null
    /**
     * Filter, which Element to fetch.
     */
    where: ElementWhereUniqueInput
  }

  /**
   * Element findUniqueOrThrow
   */
  export type ElementFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Element
     */
    select?: ElementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Element
     */
    omit?: ElementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ElementInclude<ExtArgs> | null
    /**
     * Filter, which Element to fetch.
     */
    where: ElementWhereUniqueInput
  }

  /**
   * Element findFirst
   */
  export type ElementFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Element
     */
    select?: ElementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Element
     */
    omit?: ElementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ElementInclude<ExtArgs> | null
    /**
     * Filter, which Element to fetch.
     */
    where?: ElementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Elements to fetch.
     */
    orderBy?: ElementOrderByWithRelationInput | ElementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Elements.
     */
    cursor?: ElementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Elements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Elements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Elements.
     */
    distinct?: ElementScalarFieldEnum | ElementScalarFieldEnum[]
  }

  /**
   * Element findFirstOrThrow
   */
  export type ElementFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Element
     */
    select?: ElementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Element
     */
    omit?: ElementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ElementInclude<ExtArgs> | null
    /**
     * Filter, which Element to fetch.
     */
    where?: ElementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Elements to fetch.
     */
    orderBy?: ElementOrderByWithRelationInput | ElementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Elements.
     */
    cursor?: ElementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Elements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Elements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Elements.
     */
    distinct?: ElementScalarFieldEnum | ElementScalarFieldEnum[]
  }

  /**
   * Element findMany
   */
  export type ElementFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Element
     */
    select?: ElementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Element
     */
    omit?: ElementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ElementInclude<ExtArgs> | null
    /**
     * Filter, which Elements to fetch.
     */
    where?: ElementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Elements to fetch.
     */
    orderBy?: ElementOrderByWithRelationInput | ElementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Elements.
     */
    cursor?: ElementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Elements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Elements.
     */
    skip?: number
    distinct?: ElementScalarFieldEnum | ElementScalarFieldEnum[]
  }

  /**
   * Element create
   */
  export type ElementCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Element
     */
    select?: ElementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Element
     */
    omit?: ElementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ElementInclude<ExtArgs> | null
    /**
     * The data needed to create a Element.
     */
    data: XOR<ElementCreateInput, ElementUncheckedCreateInput>
  }

  /**
   * Element createMany
   */
  export type ElementCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Elements.
     */
    data: ElementCreateManyInput | ElementCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Element createManyAndReturn
   */
  export type ElementCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Element
     */
    select?: ElementSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Element
     */
    omit?: ElementOmit<ExtArgs> | null
    /**
     * The data used to create many Elements.
     */
    data: ElementCreateManyInput | ElementCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Element update
   */
  export type ElementUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Element
     */
    select?: ElementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Element
     */
    omit?: ElementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ElementInclude<ExtArgs> | null
    /**
     * The data needed to update a Element.
     */
    data: XOR<ElementUpdateInput, ElementUncheckedUpdateInput>
    /**
     * Choose, which Element to update.
     */
    where: ElementWhereUniqueInput
  }

  /**
   * Element updateMany
   */
  export type ElementUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Elements.
     */
    data: XOR<ElementUpdateManyMutationInput, ElementUncheckedUpdateManyInput>
    /**
     * Filter which Elements to update
     */
    where?: ElementWhereInput
    /**
     * Limit how many Elements to update.
     */
    limit?: number
  }

  /**
   * Element updateManyAndReturn
   */
  export type ElementUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Element
     */
    select?: ElementSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Element
     */
    omit?: ElementOmit<ExtArgs> | null
    /**
     * The data used to update Elements.
     */
    data: XOR<ElementUpdateManyMutationInput, ElementUncheckedUpdateManyInput>
    /**
     * Filter which Elements to update
     */
    where?: ElementWhereInput
    /**
     * Limit how many Elements to update.
     */
    limit?: number
  }

  /**
   * Element upsert
   */
  export type ElementUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Element
     */
    select?: ElementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Element
     */
    omit?: ElementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ElementInclude<ExtArgs> | null
    /**
     * The filter to search for the Element to update in case it exists.
     */
    where: ElementWhereUniqueInput
    /**
     * In case the Element found by the `where` argument doesn't exist, create a new Element with this data.
     */
    create: XOR<ElementCreateInput, ElementUncheckedCreateInput>
    /**
     * In case the Element was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ElementUpdateInput, ElementUncheckedUpdateInput>
  }

  /**
   * Element delete
   */
  export type ElementDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Element
     */
    select?: ElementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Element
     */
    omit?: ElementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ElementInclude<ExtArgs> | null
    /**
     * Filter which Element to delete.
     */
    where: ElementWhereUniqueInput
  }

  /**
   * Element deleteMany
   */
  export type ElementDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Elements to delete
     */
    where?: ElementWhereInput
    /**
     * Limit how many Elements to delete.
     */
    limit?: number
  }

  /**
   * Element.spaces
   */
  export type Element$spacesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the spaceElements
     */
    select?: spaceElementsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the spaceElements
     */
    omit?: spaceElementsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: spaceElementsInclude<ExtArgs> | null
    where?: spaceElementsWhereInput
    orderBy?: spaceElementsOrderByWithRelationInput | spaceElementsOrderByWithRelationInput[]
    cursor?: spaceElementsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SpaceElementsScalarFieldEnum | SpaceElementsScalarFieldEnum[]
  }

  /**
   * Element.mapElements
   */
  export type Element$mapElementsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MapElements
     */
    select?: MapElementsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MapElements
     */
    omit?: MapElementsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MapElementsInclude<ExtArgs> | null
    where?: MapElementsWhereInput
    orderBy?: MapElementsOrderByWithRelationInput | MapElementsOrderByWithRelationInput[]
    cursor?: MapElementsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MapElementsScalarFieldEnum | MapElementsScalarFieldEnum[]
  }

  /**
   * Element without action
   */
  export type ElementDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Element
     */
    select?: ElementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Element
     */
    omit?: ElementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ElementInclude<ExtArgs> | null
  }


  /**
   * Model Map
   */

  export type AggregateMap = {
    _count: MapCountAggregateOutputType | null
    _avg: MapAvgAggregateOutputType | null
    _sum: MapSumAggregateOutputType | null
    _min: MapMinAggregateOutputType | null
    _max: MapMaxAggregateOutputType | null
  }

  export type MapAvgAggregateOutputType = {
    width: number | null
    height: number | null
  }

  export type MapSumAggregateOutputType = {
    width: number | null
    height: number | null
  }

  export type MapMinAggregateOutputType = {
    id: string | null
    width: number | null
    height: number | null
    name: string | null
  }

  export type MapMaxAggregateOutputType = {
    id: string | null
    width: number | null
    height: number | null
    name: string | null
  }

  export type MapCountAggregateOutputType = {
    id: number
    width: number
    height: number
    name: number
    _all: number
  }


  export type MapAvgAggregateInputType = {
    width?: true
    height?: true
  }

  export type MapSumAggregateInputType = {
    width?: true
    height?: true
  }

  export type MapMinAggregateInputType = {
    id?: true
    width?: true
    height?: true
    name?: true
  }

  export type MapMaxAggregateInputType = {
    id?: true
    width?: true
    height?: true
    name?: true
  }

  export type MapCountAggregateInputType = {
    id?: true
    width?: true
    height?: true
    name?: true
    _all?: true
  }

  export type MapAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Map to aggregate.
     */
    where?: MapWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Maps to fetch.
     */
    orderBy?: MapOrderByWithRelationInput | MapOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MapWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Maps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Maps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Maps
    **/
    _count?: true | MapCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MapAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MapSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MapMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MapMaxAggregateInputType
  }

  export type GetMapAggregateType<T extends MapAggregateArgs> = {
        [P in keyof T & keyof AggregateMap]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMap[P]>
      : GetScalarType<T[P], AggregateMap[P]>
  }




  export type MapGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MapWhereInput
    orderBy?: MapOrderByWithAggregationInput | MapOrderByWithAggregationInput[]
    by: MapScalarFieldEnum[] | MapScalarFieldEnum
    having?: MapScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MapCountAggregateInputType | true
    _avg?: MapAvgAggregateInputType
    _sum?: MapSumAggregateInputType
    _min?: MapMinAggregateInputType
    _max?: MapMaxAggregateInputType
  }

  export type MapGroupByOutputType = {
    id: string
    width: number
    height: number
    name: string
    _count: MapCountAggregateOutputType | null
    _avg: MapAvgAggregateOutputType | null
    _sum: MapSumAggregateOutputType | null
    _min: MapMinAggregateOutputType | null
    _max: MapMaxAggregateOutputType | null
  }

  type GetMapGroupByPayload<T extends MapGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MapGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MapGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MapGroupByOutputType[P]>
            : GetScalarType<T[P], MapGroupByOutputType[P]>
        }
      >
    >


  export type MapSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    width?: boolean
    height?: boolean
    name?: boolean
    mapElements?: boolean | Map$mapElementsArgs<ExtArgs>
    _count?: boolean | MapCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["map"]>

  export type MapSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    width?: boolean
    height?: boolean
    name?: boolean
  }, ExtArgs["result"]["map"]>

  export type MapSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    width?: boolean
    height?: boolean
    name?: boolean
  }, ExtArgs["result"]["map"]>

  export type MapSelectScalar = {
    id?: boolean
    width?: boolean
    height?: boolean
    name?: boolean
  }

  export type MapOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "width" | "height" | "name", ExtArgs["result"]["map"]>
  export type MapInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    mapElements?: boolean | Map$mapElementsArgs<ExtArgs>
    _count?: boolean | MapCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type MapIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type MapIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $MapPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Map"
    objects: {
      mapElements: Prisma.$MapElementsPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      width: number
      height: number
      name: string
    }, ExtArgs["result"]["map"]>
    composites: {}
  }

  type MapGetPayload<S extends boolean | null | undefined | MapDefaultArgs> = $Result.GetResult<Prisma.$MapPayload, S>

  type MapCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MapFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MapCountAggregateInputType | true
    }

  export interface MapDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Map'], meta: { name: 'Map' } }
    /**
     * Find zero or one Map that matches the filter.
     * @param {MapFindUniqueArgs} args - Arguments to find a Map
     * @example
     * // Get one Map
     * const map = await prisma.map.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MapFindUniqueArgs>(args: SelectSubset<T, MapFindUniqueArgs<ExtArgs>>): Prisma__MapClient<$Result.GetResult<Prisma.$MapPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Map that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MapFindUniqueOrThrowArgs} args - Arguments to find a Map
     * @example
     * // Get one Map
     * const map = await prisma.map.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MapFindUniqueOrThrowArgs>(args: SelectSubset<T, MapFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MapClient<$Result.GetResult<Prisma.$MapPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Map that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MapFindFirstArgs} args - Arguments to find a Map
     * @example
     * // Get one Map
     * const map = await prisma.map.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MapFindFirstArgs>(args?: SelectSubset<T, MapFindFirstArgs<ExtArgs>>): Prisma__MapClient<$Result.GetResult<Prisma.$MapPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Map that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MapFindFirstOrThrowArgs} args - Arguments to find a Map
     * @example
     * // Get one Map
     * const map = await prisma.map.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MapFindFirstOrThrowArgs>(args?: SelectSubset<T, MapFindFirstOrThrowArgs<ExtArgs>>): Prisma__MapClient<$Result.GetResult<Prisma.$MapPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Maps that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MapFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Maps
     * const maps = await prisma.map.findMany()
     * 
     * // Get first 10 Maps
     * const maps = await prisma.map.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const mapWithIdOnly = await prisma.map.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MapFindManyArgs>(args?: SelectSubset<T, MapFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MapPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Map.
     * @param {MapCreateArgs} args - Arguments to create a Map.
     * @example
     * // Create one Map
     * const Map = await prisma.map.create({
     *   data: {
     *     // ... data to create a Map
     *   }
     * })
     * 
     */
    create<T extends MapCreateArgs>(args: SelectSubset<T, MapCreateArgs<ExtArgs>>): Prisma__MapClient<$Result.GetResult<Prisma.$MapPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Maps.
     * @param {MapCreateManyArgs} args - Arguments to create many Maps.
     * @example
     * // Create many Maps
     * const map = await prisma.map.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MapCreateManyArgs>(args?: SelectSubset<T, MapCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Maps and returns the data saved in the database.
     * @param {MapCreateManyAndReturnArgs} args - Arguments to create many Maps.
     * @example
     * // Create many Maps
     * const map = await prisma.map.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Maps and only return the `id`
     * const mapWithIdOnly = await prisma.map.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MapCreateManyAndReturnArgs>(args?: SelectSubset<T, MapCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MapPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Map.
     * @param {MapDeleteArgs} args - Arguments to delete one Map.
     * @example
     * // Delete one Map
     * const Map = await prisma.map.delete({
     *   where: {
     *     // ... filter to delete one Map
     *   }
     * })
     * 
     */
    delete<T extends MapDeleteArgs>(args: SelectSubset<T, MapDeleteArgs<ExtArgs>>): Prisma__MapClient<$Result.GetResult<Prisma.$MapPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Map.
     * @param {MapUpdateArgs} args - Arguments to update one Map.
     * @example
     * // Update one Map
     * const map = await prisma.map.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MapUpdateArgs>(args: SelectSubset<T, MapUpdateArgs<ExtArgs>>): Prisma__MapClient<$Result.GetResult<Prisma.$MapPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Maps.
     * @param {MapDeleteManyArgs} args - Arguments to filter Maps to delete.
     * @example
     * // Delete a few Maps
     * const { count } = await prisma.map.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MapDeleteManyArgs>(args?: SelectSubset<T, MapDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Maps.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MapUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Maps
     * const map = await prisma.map.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MapUpdateManyArgs>(args: SelectSubset<T, MapUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Maps and returns the data updated in the database.
     * @param {MapUpdateManyAndReturnArgs} args - Arguments to update many Maps.
     * @example
     * // Update many Maps
     * const map = await prisma.map.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Maps and only return the `id`
     * const mapWithIdOnly = await prisma.map.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MapUpdateManyAndReturnArgs>(args: SelectSubset<T, MapUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MapPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Map.
     * @param {MapUpsertArgs} args - Arguments to update or create a Map.
     * @example
     * // Update or create a Map
     * const map = await prisma.map.upsert({
     *   create: {
     *     // ... data to create a Map
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Map we want to update
     *   }
     * })
     */
    upsert<T extends MapUpsertArgs>(args: SelectSubset<T, MapUpsertArgs<ExtArgs>>): Prisma__MapClient<$Result.GetResult<Prisma.$MapPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Maps.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MapCountArgs} args - Arguments to filter Maps to count.
     * @example
     * // Count the number of Maps
     * const count = await prisma.map.count({
     *   where: {
     *     // ... the filter for the Maps we want to count
     *   }
     * })
    **/
    count<T extends MapCountArgs>(
      args?: Subset<T, MapCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MapCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Map.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MapAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MapAggregateArgs>(args: Subset<T, MapAggregateArgs>): Prisma.PrismaPromise<GetMapAggregateType<T>>

    /**
     * Group by Map.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MapGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MapGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MapGroupByArgs['orderBy'] }
        : { orderBy?: MapGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MapGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMapGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Map model
   */
  readonly fields: MapFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Map.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MapClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    mapElements<T extends Map$mapElementsArgs<ExtArgs> = {}>(args?: Subset<T, Map$mapElementsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MapElementsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Map model
   */
  interface MapFieldRefs {
    readonly id: FieldRef<"Map", 'String'>
    readonly width: FieldRef<"Map", 'Int'>
    readonly height: FieldRef<"Map", 'Int'>
    readonly name: FieldRef<"Map", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Map findUnique
   */
  export type MapFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Map
     */
    select?: MapSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Map
     */
    omit?: MapOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MapInclude<ExtArgs> | null
    /**
     * Filter, which Map to fetch.
     */
    where: MapWhereUniqueInput
  }

  /**
   * Map findUniqueOrThrow
   */
  export type MapFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Map
     */
    select?: MapSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Map
     */
    omit?: MapOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MapInclude<ExtArgs> | null
    /**
     * Filter, which Map to fetch.
     */
    where: MapWhereUniqueInput
  }

  /**
   * Map findFirst
   */
  export type MapFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Map
     */
    select?: MapSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Map
     */
    omit?: MapOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MapInclude<ExtArgs> | null
    /**
     * Filter, which Map to fetch.
     */
    where?: MapWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Maps to fetch.
     */
    orderBy?: MapOrderByWithRelationInput | MapOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Maps.
     */
    cursor?: MapWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Maps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Maps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Maps.
     */
    distinct?: MapScalarFieldEnum | MapScalarFieldEnum[]
  }

  /**
   * Map findFirstOrThrow
   */
  export type MapFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Map
     */
    select?: MapSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Map
     */
    omit?: MapOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MapInclude<ExtArgs> | null
    /**
     * Filter, which Map to fetch.
     */
    where?: MapWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Maps to fetch.
     */
    orderBy?: MapOrderByWithRelationInput | MapOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Maps.
     */
    cursor?: MapWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Maps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Maps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Maps.
     */
    distinct?: MapScalarFieldEnum | MapScalarFieldEnum[]
  }

  /**
   * Map findMany
   */
  export type MapFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Map
     */
    select?: MapSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Map
     */
    omit?: MapOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MapInclude<ExtArgs> | null
    /**
     * Filter, which Maps to fetch.
     */
    where?: MapWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Maps to fetch.
     */
    orderBy?: MapOrderByWithRelationInput | MapOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Maps.
     */
    cursor?: MapWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Maps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Maps.
     */
    skip?: number
    distinct?: MapScalarFieldEnum | MapScalarFieldEnum[]
  }

  /**
   * Map create
   */
  export type MapCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Map
     */
    select?: MapSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Map
     */
    omit?: MapOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MapInclude<ExtArgs> | null
    /**
     * The data needed to create a Map.
     */
    data: XOR<MapCreateInput, MapUncheckedCreateInput>
  }

  /**
   * Map createMany
   */
  export type MapCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Maps.
     */
    data: MapCreateManyInput | MapCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Map createManyAndReturn
   */
  export type MapCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Map
     */
    select?: MapSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Map
     */
    omit?: MapOmit<ExtArgs> | null
    /**
     * The data used to create many Maps.
     */
    data: MapCreateManyInput | MapCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Map update
   */
  export type MapUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Map
     */
    select?: MapSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Map
     */
    omit?: MapOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MapInclude<ExtArgs> | null
    /**
     * The data needed to update a Map.
     */
    data: XOR<MapUpdateInput, MapUncheckedUpdateInput>
    /**
     * Choose, which Map to update.
     */
    where: MapWhereUniqueInput
  }

  /**
   * Map updateMany
   */
  export type MapUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Maps.
     */
    data: XOR<MapUpdateManyMutationInput, MapUncheckedUpdateManyInput>
    /**
     * Filter which Maps to update
     */
    where?: MapWhereInput
    /**
     * Limit how many Maps to update.
     */
    limit?: number
  }

  /**
   * Map updateManyAndReturn
   */
  export type MapUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Map
     */
    select?: MapSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Map
     */
    omit?: MapOmit<ExtArgs> | null
    /**
     * The data used to update Maps.
     */
    data: XOR<MapUpdateManyMutationInput, MapUncheckedUpdateManyInput>
    /**
     * Filter which Maps to update
     */
    where?: MapWhereInput
    /**
     * Limit how many Maps to update.
     */
    limit?: number
  }

  /**
   * Map upsert
   */
  export type MapUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Map
     */
    select?: MapSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Map
     */
    omit?: MapOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MapInclude<ExtArgs> | null
    /**
     * The filter to search for the Map to update in case it exists.
     */
    where: MapWhereUniqueInput
    /**
     * In case the Map found by the `where` argument doesn't exist, create a new Map with this data.
     */
    create: XOR<MapCreateInput, MapUncheckedCreateInput>
    /**
     * In case the Map was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MapUpdateInput, MapUncheckedUpdateInput>
  }

  /**
   * Map delete
   */
  export type MapDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Map
     */
    select?: MapSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Map
     */
    omit?: MapOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MapInclude<ExtArgs> | null
    /**
     * Filter which Map to delete.
     */
    where: MapWhereUniqueInput
  }

  /**
   * Map deleteMany
   */
  export type MapDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Maps to delete
     */
    where?: MapWhereInput
    /**
     * Limit how many Maps to delete.
     */
    limit?: number
  }

  /**
   * Map.mapElements
   */
  export type Map$mapElementsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MapElements
     */
    select?: MapElementsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MapElements
     */
    omit?: MapElementsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MapElementsInclude<ExtArgs> | null
    where?: MapElementsWhereInput
    orderBy?: MapElementsOrderByWithRelationInput | MapElementsOrderByWithRelationInput[]
    cursor?: MapElementsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MapElementsScalarFieldEnum | MapElementsScalarFieldEnum[]
  }

  /**
   * Map without action
   */
  export type MapDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Map
     */
    select?: MapSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Map
     */
    omit?: MapOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MapInclude<ExtArgs> | null
  }


  /**
   * Model MapElements
   */

  export type AggregateMapElements = {
    _count: MapElementsCountAggregateOutputType | null
    _avg: MapElementsAvgAggregateOutputType | null
    _sum: MapElementsSumAggregateOutputType | null
    _min: MapElementsMinAggregateOutputType | null
    _max: MapElementsMaxAggregateOutputType | null
  }

  export type MapElementsAvgAggregateOutputType = {
    x: number | null
    y: number | null
  }

  export type MapElementsSumAggregateOutputType = {
    x: number | null
    y: number | null
  }

  export type MapElementsMinAggregateOutputType = {
    id: string | null
    mapId: string | null
    elementId: string | null
    x: number | null
    y: number | null
  }

  export type MapElementsMaxAggregateOutputType = {
    id: string | null
    mapId: string | null
    elementId: string | null
    x: number | null
    y: number | null
  }

  export type MapElementsCountAggregateOutputType = {
    id: number
    mapId: number
    elementId: number
    x: number
    y: number
    _all: number
  }


  export type MapElementsAvgAggregateInputType = {
    x?: true
    y?: true
  }

  export type MapElementsSumAggregateInputType = {
    x?: true
    y?: true
  }

  export type MapElementsMinAggregateInputType = {
    id?: true
    mapId?: true
    elementId?: true
    x?: true
    y?: true
  }

  export type MapElementsMaxAggregateInputType = {
    id?: true
    mapId?: true
    elementId?: true
    x?: true
    y?: true
  }

  export type MapElementsCountAggregateInputType = {
    id?: true
    mapId?: true
    elementId?: true
    x?: true
    y?: true
    _all?: true
  }

  export type MapElementsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MapElements to aggregate.
     */
    where?: MapElementsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MapElements to fetch.
     */
    orderBy?: MapElementsOrderByWithRelationInput | MapElementsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MapElementsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MapElements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MapElements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MapElements
    **/
    _count?: true | MapElementsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MapElementsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MapElementsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MapElementsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MapElementsMaxAggregateInputType
  }

  export type GetMapElementsAggregateType<T extends MapElementsAggregateArgs> = {
        [P in keyof T & keyof AggregateMapElements]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMapElements[P]>
      : GetScalarType<T[P], AggregateMapElements[P]>
  }




  export type MapElementsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MapElementsWhereInput
    orderBy?: MapElementsOrderByWithAggregationInput | MapElementsOrderByWithAggregationInput[]
    by: MapElementsScalarFieldEnum[] | MapElementsScalarFieldEnum
    having?: MapElementsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MapElementsCountAggregateInputType | true
    _avg?: MapElementsAvgAggregateInputType
    _sum?: MapElementsSumAggregateInputType
    _min?: MapElementsMinAggregateInputType
    _max?: MapElementsMaxAggregateInputType
  }

  export type MapElementsGroupByOutputType = {
    id: string
    mapId: string
    elementId: string
    x: number | null
    y: number | null
    _count: MapElementsCountAggregateOutputType | null
    _avg: MapElementsAvgAggregateOutputType | null
    _sum: MapElementsSumAggregateOutputType | null
    _min: MapElementsMinAggregateOutputType | null
    _max: MapElementsMaxAggregateOutputType | null
  }

  type GetMapElementsGroupByPayload<T extends MapElementsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MapElementsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MapElementsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MapElementsGroupByOutputType[P]>
            : GetScalarType<T[P], MapElementsGroupByOutputType[P]>
        }
      >
    >


  export type MapElementsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    mapId?: boolean
    elementId?: boolean
    x?: boolean
    y?: boolean
    map?: boolean | MapDefaultArgs<ExtArgs>
    element?: boolean | ElementDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["mapElements"]>

  export type MapElementsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    mapId?: boolean
    elementId?: boolean
    x?: boolean
    y?: boolean
    map?: boolean | MapDefaultArgs<ExtArgs>
    element?: boolean | ElementDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["mapElements"]>

  export type MapElementsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    mapId?: boolean
    elementId?: boolean
    x?: boolean
    y?: boolean
    map?: boolean | MapDefaultArgs<ExtArgs>
    element?: boolean | ElementDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["mapElements"]>

  export type MapElementsSelectScalar = {
    id?: boolean
    mapId?: boolean
    elementId?: boolean
    x?: boolean
    y?: boolean
  }

  export type MapElementsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "mapId" | "elementId" | "x" | "y", ExtArgs["result"]["mapElements"]>
  export type MapElementsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    map?: boolean | MapDefaultArgs<ExtArgs>
    element?: boolean | ElementDefaultArgs<ExtArgs>
  }
  export type MapElementsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    map?: boolean | MapDefaultArgs<ExtArgs>
    element?: boolean | ElementDefaultArgs<ExtArgs>
  }
  export type MapElementsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    map?: boolean | MapDefaultArgs<ExtArgs>
    element?: boolean | ElementDefaultArgs<ExtArgs>
  }

  export type $MapElementsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MapElements"
    objects: {
      map: Prisma.$MapPayload<ExtArgs>
      element: Prisma.$ElementPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      mapId: string
      elementId: string
      x: number | null
      y: number | null
    }, ExtArgs["result"]["mapElements"]>
    composites: {}
  }

  type MapElementsGetPayload<S extends boolean | null | undefined | MapElementsDefaultArgs> = $Result.GetResult<Prisma.$MapElementsPayload, S>

  type MapElementsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MapElementsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MapElementsCountAggregateInputType | true
    }

  export interface MapElementsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MapElements'], meta: { name: 'MapElements' } }
    /**
     * Find zero or one MapElements that matches the filter.
     * @param {MapElementsFindUniqueArgs} args - Arguments to find a MapElements
     * @example
     * // Get one MapElements
     * const mapElements = await prisma.mapElements.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MapElementsFindUniqueArgs>(args: SelectSubset<T, MapElementsFindUniqueArgs<ExtArgs>>): Prisma__MapElementsClient<$Result.GetResult<Prisma.$MapElementsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MapElements that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MapElementsFindUniqueOrThrowArgs} args - Arguments to find a MapElements
     * @example
     * // Get one MapElements
     * const mapElements = await prisma.mapElements.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MapElementsFindUniqueOrThrowArgs>(args: SelectSubset<T, MapElementsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MapElementsClient<$Result.GetResult<Prisma.$MapElementsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MapElements that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MapElementsFindFirstArgs} args - Arguments to find a MapElements
     * @example
     * // Get one MapElements
     * const mapElements = await prisma.mapElements.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MapElementsFindFirstArgs>(args?: SelectSubset<T, MapElementsFindFirstArgs<ExtArgs>>): Prisma__MapElementsClient<$Result.GetResult<Prisma.$MapElementsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MapElements that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MapElementsFindFirstOrThrowArgs} args - Arguments to find a MapElements
     * @example
     * // Get one MapElements
     * const mapElements = await prisma.mapElements.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MapElementsFindFirstOrThrowArgs>(args?: SelectSubset<T, MapElementsFindFirstOrThrowArgs<ExtArgs>>): Prisma__MapElementsClient<$Result.GetResult<Prisma.$MapElementsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MapElements that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MapElementsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MapElements
     * const mapElements = await prisma.mapElements.findMany()
     * 
     * // Get first 10 MapElements
     * const mapElements = await prisma.mapElements.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const mapElementsWithIdOnly = await prisma.mapElements.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MapElementsFindManyArgs>(args?: SelectSubset<T, MapElementsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MapElementsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MapElements.
     * @param {MapElementsCreateArgs} args - Arguments to create a MapElements.
     * @example
     * // Create one MapElements
     * const MapElements = await prisma.mapElements.create({
     *   data: {
     *     // ... data to create a MapElements
     *   }
     * })
     * 
     */
    create<T extends MapElementsCreateArgs>(args: SelectSubset<T, MapElementsCreateArgs<ExtArgs>>): Prisma__MapElementsClient<$Result.GetResult<Prisma.$MapElementsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MapElements.
     * @param {MapElementsCreateManyArgs} args - Arguments to create many MapElements.
     * @example
     * // Create many MapElements
     * const mapElements = await prisma.mapElements.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MapElementsCreateManyArgs>(args?: SelectSubset<T, MapElementsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MapElements and returns the data saved in the database.
     * @param {MapElementsCreateManyAndReturnArgs} args - Arguments to create many MapElements.
     * @example
     * // Create many MapElements
     * const mapElements = await prisma.mapElements.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MapElements and only return the `id`
     * const mapElementsWithIdOnly = await prisma.mapElements.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MapElementsCreateManyAndReturnArgs>(args?: SelectSubset<T, MapElementsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MapElementsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a MapElements.
     * @param {MapElementsDeleteArgs} args - Arguments to delete one MapElements.
     * @example
     * // Delete one MapElements
     * const MapElements = await prisma.mapElements.delete({
     *   where: {
     *     // ... filter to delete one MapElements
     *   }
     * })
     * 
     */
    delete<T extends MapElementsDeleteArgs>(args: SelectSubset<T, MapElementsDeleteArgs<ExtArgs>>): Prisma__MapElementsClient<$Result.GetResult<Prisma.$MapElementsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MapElements.
     * @param {MapElementsUpdateArgs} args - Arguments to update one MapElements.
     * @example
     * // Update one MapElements
     * const mapElements = await prisma.mapElements.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MapElementsUpdateArgs>(args: SelectSubset<T, MapElementsUpdateArgs<ExtArgs>>): Prisma__MapElementsClient<$Result.GetResult<Prisma.$MapElementsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MapElements.
     * @param {MapElementsDeleteManyArgs} args - Arguments to filter MapElements to delete.
     * @example
     * // Delete a few MapElements
     * const { count } = await prisma.mapElements.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MapElementsDeleteManyArgs>(args?: SelectSubset<T, MapElementsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MapElements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MapElementsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MapElements
     * const mapElements = await prisma.mapElements.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MapElementsUpdateManyArgs>(args: SelectSubset<T, MapElementsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MapElements and returns the data updated in the database.
     * @param {MapElementsUpdateManyAndReturnArgs} args - Arguments to update many MapElements.
     * @example
     * // Update many MapElements
     * const mapElements = await prisma.mapElements.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more MapElements and only return the `id`
     * const mapElementsWithIdOnly = await prisma.mapElements.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MapElementsUpdateManyAndReturnArgs>(args: SelectSubset<T, MapElementsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MapElementsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one MapElements.
     * @param {MapElementsUpsertArgs} args - Arguments to update or create a MapElements.
     * @example
     * // Update or create a MapElements
     * const mapElements = await prisma.mapElements.upsert({
     *   create: {
     *     // ... data to create a MapElements
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MapElements we want to update
     *   }
     * })
     */
    upsert<T extends MapElementsUpsertArgs>(args: SelectSubset<T, MapElementsUpsertArgs<ExtArgs>>): Prisma__MapElementsClient<$Result.GetResult<Prisma.$MapElementsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of MapElements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MapElementsCountArgs} args - Arguments to filter MapElements to count.
     * @example
     * // Count the number of MapElements
     * const count = await prisma.mapElements.count({
     *   where: {
     *     // ... the filter for the MapElements we want to count
     *   }
     * })
    **/
    count<T extends MapElementsCountArgs>(
      args?: Subset<T, MapElementsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MapElementsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MapElements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MapElementsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MapElementsAggregateArgs>(args: Subset<T, MapElementsAggregateArgs>): Prisma.PrismaPromise<GetMapElementsAggregateType<T>>

    /**
     * Group by MapElements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MapElementsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MapElementsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MapElementsGroupByArgs['orderBy'] }
        : { orderBy?: MapElementsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MapElementsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMapElementsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MapElements model
   */
  readonly fields: MapElementsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MapElements.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MapElementsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    map<T extends MapDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MapDefaultArgs<ExtArgs>>): Prisma__MapClient<$Result.GetResult<Prisma.$MapPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    element<T extends ElementDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ElementDefaultArgs<ExtArgs>>): Prisma__ElementClient<$Result.GetResult<Prisma.$ElementPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the MapElements model
   */
  interface MapElementsFieldRefs {
    readonly id: FieldRef<"MapElements", 'String'>
    readonly mapId: FieldRef<"MapElements", 'String'>
    readonly elementId: FieldRef<"MapElements", 'String'>
    readonly x: FieldRef<"MapElements", 'Int'>
    readonly y: FieldRef<"MapElements", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * MapElements findUnique
   */
  export type MapElementsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MapElements
     */
    select?: MapElementsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MapElements
     */
    omit?: MapElementsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MapElementsInclude<ExtArgs> | null
    /**
     * Filter, which MapElements to fetch.
     */
    where: MapElementsWhereUniqueInput
  }

  /**
   * MapElements findUniqueOrThrow
   */
  export type MapElementsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MapElements
     */
    select?: MapElementsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MapElements
     */
    omit?: MapElementsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MapElementsInclude<ExtArgs> | null
    /**
     * Filter, which MapElements to fetch.
     */
    where: MapElementsWhereUniqueInput
  }

  /**
   * MapElements findFirst
   */
  export type MapElementsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MapElements
     */
    select?: MapElementsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MapElements
     */
    omit?: MapElementsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MapElementsInclude<ExtArgs> | null
    /**
     * Filter, which MapElements to fetch.
     */
    where?: MapElementsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MapElements to fetch.
     */
    orderBy?: MapElementsOrderByWithRelationInput | MapElementsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MapElements.
     */
    cursor?: MapElementsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MapElements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MapElements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MapElements.
     */
    distinct?: MapElementsScalarFieldEnum | MapElementsScalarFieldEnum[]
  }

  /**
   * MapElements findFirstOrThrow
   */
  export type MapElementsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MapElements
     */
    select?: MapElementsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MapElements
     */
    omit?: MapElementsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MapElementsInclude<ExtArgs> | null
    /**
     * Filter, which MapElements to fetch.
     */
    where?: MapElementsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MapElements to fetch.
     */
    orderBy?: MapElementsOrderByWithRelationInput | MapElementsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MapElements.
     */
    cursor?: MapElementsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MapElements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MapElements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MapElements.
     */
    distinct?: MapElementsScalarFieldEnum | MapElementsScalarFieldEnum[]
  }

  /**
   * MapElements findMany
   */
  export type MapElementsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MapElements
     */
    select?: MapElementsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MapElements
     */
    omit?: MapElementsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MapElementsInclude<ExtArgs> | null
    /**
     * Filter, which MapElements to fetch.
     */
    where?: MapElementsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MapElements to fetch.
     */
    orderBy?: MapElementsOrderByWithRelationInput | MapElementsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MapElements.
     */
    cursor?: MapElementsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MapElements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MapElements.
     */
    skip?: number
    distinct?: MapElementsScalarFieldEnum | MapElementsScalarFieldEnum[]
  }

  /**
   * MapElements create
   */
  export type MapElementsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MapElements
     */
    select?: MapElementsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MapElements
     */
    omit?: MapElementsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MapElementsInclude<ExtArgs> | null
    /**
     * The data needed to create a MapElements.
     */
    data: XOR<MapElementsCreateInput, MapElementsUncheckedCreateInput>
  }

  /**
   * MapElements createMany
   */
  export type MapElementsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MapElements.
     */
    data: MapElementsCreateManyInput | MapElementsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MapElements createManyAndReturn
   */
  export type MapElementsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MapElements
     */
    select?: MapElementsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MapElements
     */
    omit?: MapElementsOmit<ExtArgs> | null
    /**
     * The data used to create many MapElements.
     */
    data: MapElementsCreateManyInput | MapElementsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MapElementsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * MapElements update
   */
  export type MapElementsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MapElements
     */
    select?: MapElementsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MapElements
     */
    omit?: MapElementsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MapElementsInclude<ExtArgs> | null
    /**
     * The data needed to update a MapElements.
     */
    data: XOR<MapElementsUpdateInput, MapElementsUncheckedUpdateInput>
    /**
     * Choose, which MapElements to update.
     */
    where: MapElementsWhereUniqueInput
  }

  /**
   * MapElements updateMany
   */
  export type MapElementsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MapElements.
     */
    data: XOR<MapElementsUpdateManyMutationInput, MapElementsUncheckedUpdateManyInput>
    /**
     * Filter which MapElements to update
     */
    where?: MapElementsWhereInput
    /**
     * Limit how many MapElements to update.
     */
    limit?: number
  }

  /**
   * MapElements updateManyAndReturn
   */
  export type MapElementsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MapElements
     */
    select?: MapElementsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MapElements
     */
    omit?: MapElementsOmit<ExtArgs> | null
    /**
     * The data used to update MapElements.
     */
    data: XOR<MapElementsUpdateManyMutationInput, MapElementsUncheckedUpdateManyInput>
    /**
     * Filter which MapElements to update
     */
    where?: MapElementsWhereInput
    /**
     * Limit how many MapElements to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MapElementsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * MapElements upsert
   */
  export type MapElementsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MapElements
     */
    select?: MapElementsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MapElements
     */
    omit?: MapElementsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MapElementsInclude<ExtArgs> | null
    /**
     * The filter to search for the MapElements to update in case it exists.
     */
    where: MapElementsWhereUniqueInput
    /**
     * In case the MapElements found by the `where` argument doesn't exist, create a new MapElements with this data.
     */
    create: XOR<MapElementsCreateInput, MapElementsUncheckedCreateInput>
    /**
     * In case the MapElements was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MapElementsUpdateInput, MapElementsUncheckedUpdateInput>
  }

  /**
   * MapElements delete
   */
  export type MapElementsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MapElements
     */
    select?: MapElementsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MapElements
     */
    omit?: MapElementsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MapElementsInclude<ExtArgs> | null
    /**
     * Filter which MapElements to delete.
     */
    where: MapElementsWhereUniqueInput
  }

  /**
   * MapElements deleteMany
   */
  export type MapElementsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MapElements to delete
     */
    where?: MapElementsWhereInput
    /**
     * Limit how many MapElements to delete.
     */
    limit?: number
  }

  /**
   * MapElements without action
   */
  export type MapElementsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MapElements
     */
    select?: MapElementsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MapElements
     */
    omit?: MapElementsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MapElementsInclude<ExtArgs> | null
  }


  /**
   * Model Avatar
   */

  export type AggregateAvatar = {
    _count: AvatarCountAggregateOutputType | null
    _min: AvatarMinAggregateOutputType | null
    _max: AvatarMaxAggregateOutputType | null
  }

  export type AvatarMinAggregateOutputType = {
    id: string | null
    imageUrl: string | null
    name: string | null
  }

  export type AvatarMaxAggregateOutputType = {
    id: string | null
    imageUrl: string | null
    name: string | null
  }

  export type AvatarCountAggregateOutputType = {
    id: number
    imageUrl: number
    name: number
    _all: number
  }


  export type AvatarMinAggregateInputType = {
    id?: true
    imageUrl?: true
    name?: true
  }

  export type AvatarMaxAggregateInputType = {
    id?: true
    imageUrl?: true
    name?: true
  }

  export type AvatarCountAggregateInputType = {
    id?: true
    imageUrl?: true
    name?: true
    _all?: true
  }

  export type AvatarAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Avatar to aggregate.
     */
    where?: AvatarWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Avatars to fetch.
     */
    orderBy?: AvatarOrderByWithRelationInput | AvatarOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AvatarWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Avatars from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Avatars.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Avatars
    **/
    _count?: true | AvatarCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AvatarMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AvatarMaxAggregateInputType
  }

  export type GetAvatarAggregateType<T extends AvatarAggregateArgs> = {
        [P in keyof T & keyof AggregateAvatar]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAvatar[P]>
      : GetScalarType<T[P], AggregateAvatar[P]>
  }




  export type AvatarGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AvatarWhereInput
    orderBy?: AvatarOrderByWithAggregationInput | AvatarOrderByWithAggregationInput[]
    by: AvatarScalarFieldEnum[] | AvatarScalarFieldEnum
    having?: AvatarScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AvatarCountAggregateInputType | true
    _min?: AvatarMinAggregateInputType
    _max?: AvatarMaxAggregateInputType
  }

  export type AvatarGroupByOutputType = {
    id: string
    imageUrl: string | null
    name: string | null
    _count: AvatarCountAggregateOutputType | null
    _min: AvatarMinAggregateOutputType | null
    _max: AvatarMaxAggregateOutputType | null
  }

  type GetAvatarGroupByPayload<T extends AvatarGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AvatarGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AvatarGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AvatarGroupByOutputType[P]>
            : GetScalarType<T[P], AvatarGroupByOutputType[P]>
        }
      >
    >


  export type AvatarSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    imageUrl?: boolean
    name?: boolean
    users?: boolean | Avatar$usersArgs<ExtArgs>
    _count?: boolean | AvatarCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["avatar"]>

  export type AvatarSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    imageUrl?: boolean
    name?: boolean
  }, ExtArgs["result"]["avatar"]>

  export type AvatarSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    imageUrl?: boolean
    name?: boolean
  }, ExtArgs["result"]["avatar"]>

  export type AvatarSelectScalar = {
    id?: boolean
    imageUrl?: boolean
    name?: boolean
  }

  export type AvatarOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "imageUrl" | "name", ExtArgs["result"]["avatar"]>
  export type AvatarInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | Avatar$usersArgs<ExtArgs>
    _count?: boolean | AvatarCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type AvatarIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type AvatarIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $AvatarPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Avatar"
    objects: {
      users: Prisma.$UserPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      imageUrl: string | null
      name: string | null
    }, ExtArgs["result"]["avatar"]>
    composites: {}
  }

  type AvatarGetPayload<S extends boolean | null | undefined | AvatarDefaultArgs> = $Result.GetResult<Prisma.$AvatarPayload, S>

  type AvatarCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AvatarFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AvatarCountAggregateInputType | true
    }

  export interface AvatarDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Avatar'], meta: { name: 'Avatar' } }
    /**
     * Find zero or one Avatar that matches the filter.
     * @param {AvatarFindUniqueArgs} args - Arguments to find a Avatar
     * @example
     * // Get one Avatar
     * const avatar = await prisma.avatar.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AvatarFindUniqueArgs>(args: SelectSubset<T, AvatarFindUniqueArgs<ExtArgs>>): Prisma__AvatarClient<$Result.GetResult<Prisma.$AvatarPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Avatar that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AvatarFindUniqueOrThrowArgs} args - Arguments to find a Avatar
     * @example
     * // Get one Avatar
     * const avatar = await prisma.avatar.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AvatarFindUniqueOrThrowArgs>(args: SelectSubset<T, AvatarFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AvatarClient<$Result.GetResult<Prisma.$AvatarPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Avatar that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AvatarFindFirstArgs} args - Arguments to find a Avatar
     * @example
     * // Get one Avatar
     * const avatar = await prisma.avatar.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AvatarFindFirstArgs>(args?: SelectSubset<T, AvatarFindFirstArgs<ExtArgs>>): Prisma__AvatarClient<$Result.GetResult<Prisma.$AvatarPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Avatar that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AvatarFindFirstOrThrowArgs} args - Arguments to find a Avatar
     * @example
     * // Get one Avatar
     * const avatar = await prisma.avatar.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AvatarFindFirstOrThrowArgs>(args?: SelectSubset<T, AvatarFindFirstOrThrowArgs<ExtArgs>>): Prisma__AvatarClient<$Result.GetResult<Prisma.$AvatarPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Avatars that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AvatarFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Avatars
     * const avatars = await prisma.avatar.findMany()
     * 
     * // Get first 10 Avatars
     * const avatars = await prisma.avatar.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const avatarWithIdOnly = await prisma.avatar.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AvatarFindManyArgs>(args?: SelectSubset<T, AvatarFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AvatarPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Avatar.
     * @param {AvatarCreateArgs} args - Arguments to create a Avatar.
     * @example
     * // Create one Avatar
     * const Avatar = await prisma.avatar.create({
     *   data: {
     *     // ... data to create a Avatar
     *   }
     * })
     * 
     */
    create<T extends AvatarCreateArgs>(args: SelectSubset<T, AvatarCreateArgs<ExtArgs>>): Prisma__AvatarClient<$Result.GetResult<Prisma.$AvatarPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Avatars.
     * @param {AvatarCreateManyArgs} args - Arguments to create many Avatars.
     * @example
     * // Create many Avatars
     * const avatar = await prisma.avatar.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AvatarCreateManyArgs>(args?: SelectSubset<T, AvatarCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Avatars and returns the data saved in the database.
     * @param {AvatarCreateManyAndReturnArgs} args - Arguments to create many Avatars.
     * @example
     * // Create many Avatars
     * const avatar = await prisma.avatar.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Avatars and only return the `id`
     * const avatarWithIdOnly = await prisma.avatar.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AvatarCreateManyAndReturnArgs>(args?: SelectSubset<T, AvatarCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AvatarPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Avatar.
     * @param {AvatarDeleteArgs} args - Arguments to delete one Avatar.
     * @example
     * // Delete one Avatar
     * const Avatar = await prisma.avatar.delete({
     *   where: {
     *     // ... filter to delete one Avatar
     *   }
     * })
     * 
     */
    delete<T extends AvatarDeleteArgs>(args: SelectSubset<T, AvatarDeleteArgs<ExtArgs>>): Prisma__AvatarClient<$Result.GetResult<Prisma.$AvatarPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Avatar.
     * @param {AvatarUpdateArgs} args - Arguments to update one Avatar.
     * @example
     * // Update one Avatar
     * const avatar = await prisma.avatar.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AvatarUpdateArgs>(args: SelectSubset<T, AvatarUpdateArgs<ExtArgs>>): Prisma__AvatarClient<$Result.GetResult<Prisma.$AvatarPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Avatars.
     * @param {AvatarDeleteManyArgs} args - Arguments to filter Avatars to delete.
     * @example
     * // Delete a few Avatars
     * const { count } = await prisma.avatar.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AvatarDeleteManyArgs>(args?: SelectSubset<T, AvatarDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Avatars.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AvatarUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Avatars
     * const avatar = await prisma.avatar.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AvatarUpdateManyArgs>(args: SelectSubset<T, AvatarUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Avatars and returns the data updated in the database.
     * @param {AvatarUpdateManyAndReturnArgs} args - Arguments to update many Avatars.
     * @example
     * // Update many Avatars
     * const avatar = await prisma.avatar.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Avatars and only return the `id`
     * const avatarWithIdOnly = await prisma.avatar.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AvatarUpdateManyAndReturnArgs>(args: SelectSubset<T, AvatarUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AvatarPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Avatar.
     * @param {AvatarUpsertArgs} args - Arguments to update or create a Avatar.
     * @example
     * // Update or create a Avatar
     * const avatar = await prisma.avatar.upsert({
     *   create: {
     *     // ... data to create a Avatar
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Avatar we want to update
     *   }
     * })
     */
    upsert<T extends AvatarUpsertArgs>(args: SelectSubset<T, AvatarUpsertArgs<ExtArgs>>): Prisma__AvatarClient<$Result.GetResult<Prisma.$AvatarPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Avatars.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AvatarCountArgs} args - Arguments to filter Avatars to count.
     * @example
     * // Count the number of Avatars
     * const count = await prisma.avatar.count({
     *   where: {
     *     // ... the filter for the Avatars we want to count
     *   }
     * })
    **/
    count<T extends AvatarCountArgs>(
      args?: Subset<T, AvatarCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AvatarCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Avatar.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AvatarAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AvatarAggregateArgs>(args: Subset<T, AvatarAggregateArgs>): Prisma.PrismaPromise<GetAvatarAggregateType<T>>

    /**
     * Group by Avatar.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AvatarGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AvatarGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AvatarGroupByArgs['orderBy'] }
        : { orderBy?: AvatarGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AvatarGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAvatarGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Avatar model
   */
  readonly fields: AvatarFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Avatar.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AvatarClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    users<T extends Avatar$usersArgs<ExtArgs> = {}>(args?: Subset<T, Avatar$usersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Avatar model
   */
  interface AvatarFieldRefs {
    readonly id: FieldRef<"Avatar", 'String'>
    readonly imageUrl: FieldRef<"Avatar", 'String'>
    readonly name: FieldRef<"Avatar", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Avatar findUnique
   */
  export type AvatarFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Avatar
     */
    select?: AvatarSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Avatar
     */
    omit?: AvatarOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvatarInclude<ExtArgs> | null
    /**
     * Filter, which Avatar to fetch.
     */
    where: AvatarWhereUniqueInput
  }

  /**
   * Avatar findUniqueOrThrow
   */
  export type AvatarFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Avatar
     */
    select?: AvatarSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Avatar
     */
    omit?: AvatarOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvatarInclude<ExtArgs> | null
    /**
     * Filter, which Avatar to fetch.
     */
    where: AvatarWhereUniqueInput
  }

  /**
   * Avatar findFirst
   */
  export type AvatarFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Avatar
     */
    select?: AvatarSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Avatar
     */
    omit?: AvatarOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvatarInclude<ExtArgs> | null
    /**
     * Filter, which Avatar to fetch.
     */
    where?: AvatarWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Avatars to fetch.
     */
    orderBy?: AvatarOrderByWithRelationInput | AvatarOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Avatars.
     */
    cursor?: AvatarWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Avatars from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Avatars.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Avatars.
     */
    distinct?: AvatarScalarFieldEnum | AvatarScalarFieldEnum[]
  }

  /**
   * Avatar findFirstOrThrow
   */
  export type AvatarFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Avatar
     */
    select?: AvatarSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Avatar
     */
    omit?: AvatarOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvatarInclude<ExtArgs> | null
    /**
     * Filter, which Avatar to fetch.
     */
    where?: AvatarWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Avatars to fetch.
     */
    orderBy?: AvatarOrderByWithRelationInput | AvatarOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Avatars.
     */
    cursor?: AvatarWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Avatars from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Avatars.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Avatars.
     */
    distinct?: AvatarScalarFieldEnum | AvatarScalarFieldEnum[]
  }

  /**
   * Avatar findMany
   */
  export type AvatarFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Avatar
     */
    select?: AvatarSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Avatar
     */
    omit?: AvatarOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvatarInclude<ExtArgs> | null
    /**
     * Filter, which Avatars to fetch.
     */
    where?: AvatarWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Avatars to fetch.
     */
    orderBy?: AvatarOrderByWithRelationInput | AvatarOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Avatars.
     */
    cursor?: AvatarWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Avatars from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Avatars.
     */
    skip?: number
    distinct?: AvatarScalarFieldEnum | AvatarScalarFieldEnum[]
  }

  /**
   * Avatar create
   */
  export type AvatarCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Avatar
     */
    select?: AvatarSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Avatar
     */
    omit?: AvatarOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvatarInclude<ExtArgs> | null
    /**
     * The data needed to create a Avatar.
     */
    data?: XOR<AvatarCreateInput, AvatarUncheckedCreateInput>
  }

  /**
   * Avatar createMany
   */
  export type AvatarCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Avatars.
     */
    data: AvatarCreateManyInput | AvatarCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Avatar createManyAndReturn
   */
  export type AvatarCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Avatar
     */
    select?: AvatarSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Avatar
     */
    omit?: AvatarOmit<ExtArgs> | null
    /**
     * The data used to create many Avatars.
     */
    data: AvatarCreateManyInput | AvatarCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Avatar update
   */
  export type AvatarUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Avatar
     */
    select?: AvatarSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Avatar
     */
    omit?: AvatarOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvatarInclude<ExtArgs> | null
    /**
     * The data needed to update a Avatar.
     */
    data: XOR<AvatarUpdateInput, AvatarUncheckedUpdateInput>
    /**
     * Choose, which Avatar to update.
     */
    where: AvatarWhereUniqueInput
  }

  /**
   * Avatar updateMany
   */
  export type AvatarUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Avatars.
     */
    data: XOR<AvatarUpdateManyMutationInput, AvatarUncheckedUpdateManyInput>
    /**
     * Filter which Avatars to update
     */
    where?: AvatarWhereInput
    /**
     * Limit how many Avatars to update.
     */
    limit?: number
  }

  /**
   * Avatar updateManyAndReturn
   */
  export type AvatarUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Avatar
     */
    select?: AvatarSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Avatar
     */
    omit?: AvatarOmit<ExtArgs> | null
    /**
     * The data used to update Avatars.
     */
    data: XOR<AvatarUpdateManyMutationInput, AvatarUncheckedUpdateManyInput>
    /**
     * Filter which Avatars to update
     */
    where?: AvatarWhereInput
    /**
     * Limit how many Avatars to update.
     */
    limit?: number
  }

  /**
   * Avatar upsert
   */
  export type AvatarUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Avatar
     */
    select?: AvatarSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Avatar
     */
    omit?: AvatarOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvatarInclude<ExtArgs> | null
    /**
     * The filter to search for the Avatar to update in case it exists.
     */
    where: AvatarWhereUniqueInput
    /**
     * In case the Avatar found by the `where` argument doesn't exist, create a new Avatar with this data.
     */
    create: XOR<AvatarCreateInput, AvatarUncheckedCreateInput>
    /**
     * In case the Avatar was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AvatarUpdateInput, AvatarUncheckedUpdateInput>
  }

  /**
   * Avatar delete
   */
  export type AvatarDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Avatar
     */
    select?: AvatarSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Avatar
     */
    omit?: AvatarOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvatarInclude<ExtArgs> | null
    /**
     * Filter which Avatar to delete.
     */
    where: AvatarWhereUniqueInput
  }

  /**
   * Avatar deleteMany
   */
  export type AvatarDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Avatars to delete
     */
    where?: AvatarWhereInput
    /**
     * Limit how many Avatars to delete.
     */
    limit?: number
  }

  /**
   * Avatar.users
   */
  export type Avatar$usersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    cursor?: UserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * Avatar without action
   */
  export type AvatarDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Avatar
     */
    select?: AvatarSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Avatar
     */
    omit?: AvatarOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvatarInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    username: 'username',
    password: 'password',
    avatarId: 'avatarId',
    role: 'role'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const SpaceScalarFieldEnum: {
    id: 'id',
    name: 'name',
    width: 'width',
    height: 'height',
    thumbnail: 'thumbnail',
    creatorId: 'creatorId'
  };

  export type SpaceScalarFieldEnum = (typeof SpaceScalarFieldEnum)[keyof typeof SpaceScalarFieldEnum]


  export const SpaceElementsScalarFieldEnum: {
    id: 'id',
    elementId: 'elementId',
    spaceId: 'spaceId',
    x: 'x',
    y: 'y'
  };

  export type SpaceElementsScalarFieldEnum = (typeof SpaceElementsScalarFieldEnum)[keyof typeof SpaceElementsScalarFieldEnum]


  export const ElementScalarFieldEnum: {
    id: 'id',
    width: 'width',
    height: 'height',
    imageUrl: 'imageUrl'
  };

  export type ElementScalarFieldEnum = (typeof ElementScalarFieldEnum)[keyof typeof ElementScalarFieldEnum]


  export const MapScalarFieldEnum: {
    id: 'id',
    width: 'width',
    height: 'height',
    name: 'name'
  };

  export type MapScalarFieldEnum = (typeof MapScalarFieldEnum)[keyof typeof MapScalarFieldEnum]


  export const MapElementsScalarFieldEnum: {
    id: 'id',
    mapId: 'mapId',
    elementId: 'elementId',
    x: 'x',
    y: 'y'
  };

  export type MapElementsScalarFieldEnum = (typeof MapElementsScalarFieldEnum)[keyof typeof MapElementsScalarFieldEnum]


  export const AvatarScalarFieldEnum: {
    id: 'id',
    imageUrl: 'imageUrl',
    name: 'name'
  };

  export type AvatarScalarFieldEnum = (typeof AvatarScalarFieldEnum)[keyof typeof AvatarScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'Role[]'
   */
  export type ListEnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    username?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    avatarId?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    Space?: SpaceListRelationFilter
    avatar?: XOR<AvatarScalarRelationFilter, AvatarWhereInput>
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
    avatarId?: SortOrder
    role?: SortOrder
    Space?: SpaceOrderByRelationAggregateInput
    avatar?: AvatarOrderByWithRelationInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    username?: string
    password?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    avatarId?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    Space?: SpaceListRelationFilter
    avatar?: XOR<AvatarScalarRelationFilter, AvatarWhereInput>
  }, "id" | "id" | "username" | "password">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
    avatarId?: SortOrder
    role?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    username?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    avatarId?: StringWithAggregatesFilter<"User"> | string
    role?: EnumRoleWithAggregatesFilter<"User"> | $Enums.Role
  }

  export type SpaceWhereInput = {
    AND?: SpaceWhereInput | SpaceWhereInput[]
    OR?: SpaceWhereInput[]
    NOT?: SpaceWhereInput | SpaceWhereInput[]
    id?: StringFilter<"Space"> | string
    name?: StringFilter<"Space"> | string
    width?: IntFilter<"Space"> | number
    height?: IntNullableFilter<"Space"> | number | null
    thumbnail?: StringNullableFilter<"Space"> | string | null
    creatorId?: StringFilter<"Space"> | string
    creator?: XOR<UserScalarRelationFilter, UserWhereInput>
    elements?: SpaceElementsListRelationFilter
  }

  export type SpaceOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    width?: SortOrder
    height?: SortOrderInput | SortOrder
    thumbnail?: SortOrderInput | SortOrder
    creatorId?: SortOrder
    creator?: UserOrderByWithRelationInput
    elements?: spaceElementsOrderByRelationAggregateInput
  }

  export type SpaceWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SpaceWhereInput | SpaceWhereInput[]
    OR?: SpaceWhereInput[]
    NOT?: SpaceWhereInput | SpaceWhereInput[]
    name?: StringFilter<"Space"> | string
    width?: IntFilter<"Space"> | number
    height?: IntNullableFilter<"Space"> | number | null
    thumbnail?: StringNullableFilter<"Space"> | string | null
    creatorId?: StringFilter<"Space"> | string
    creator?: XOR<UserScalarRelationFilter, UserWhereInput>
    elements?: SpaceElementsListRelationFilter
  }, "id" | "id">

  export type SpaceOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    width?: SortOrder
    height?: SortOrderInput | SortOrder
    thumbnail?: SortOrderInput | SortOrder
    creatorId?: SortOrder
    _count?: SpaceCountOrderByAggregateInput
    _avg?: SpaceAvgOrderByAggregateInput
    _max?: SpaceMaxOrderByAggregateInput
    _min?: SpaceMinOrderByAggregateInput
    _sum?: SpaceSumOrderByAggregateInput
  }

  export type SpaceScalarWhereWithAggregatesInput = {
    AND?: SpaceScalarWhereWithAggregatesInput | SpaceScalarWhereWithAggregatesInput[]
    OR?: SpaceScalarWhereWithAggregatesInput[]
    NOT?: SpaceScalarWhereWithAggregatesInput | SpaceScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Space"> | string
    name?: StringWithAggregatesFilter<"Space"> | string
    width?: IntWithAggregatesFilter<"Space"> | number
    height?: IntNullableWithAggregatesFilter<"Space"> | number | null
    thumbnail?: StringNullableWithAggregatesFilter<"Space"> | string | null
    creatorId?: StringWithAggregatesFilter<"Space"> | string
  }

  export type spaceElementsWhereInput = {
    AND?: spaceElementsWhereInput | spaceElementsWhereInput[]
    OR?: spaceElementsWhereInput[]
    NOT?: spaceElementsWhereInput | spaceElementsWhereInput[]
    id?: StringFilter<"spaceElements"> | string
    elementId?: StringFilter<"spaceElements"> | string
    spaceId?: StringFilter<"spaceElements"> | string
    x?: IntFilter<"spaceElements"> | number
    y?: IntFilter<"spaceElements"> | number
    space?: XOR<SpaceScalarRelationFilter, SpaceWhereInput>
    element?: XOR<ElementScalarRelationFilter, ElementWhereInput>
  }

  export type spaceElementsOrderByWithRelationInput = {
    id?: SortOrder
    elementId?: SortOrder
    spaceId?: SortOrder
    x?: SortOrder
    y?: SortOrder
    space?: SpaceOrderByWithRelationInput
    element?: ElementOrderByWithRelationInput
  }

  export type spaceElementsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: spaceElementsWhereInput | spaceElementsWhereInput[]
    OR?: spaceElementsWhereInput[]
    NOT?: spaceElementsWhereInput | spaceElementsWhereInput[]
    elementId?: StringFilter<"spaceElements"> | string
    spaceId?: StringFilter<"spaceElements"> | string
    x?: IntFilter<"spaceElements"> | number
    y?: IntFilter<"spaceElements"> | number
    space?: XOR<SpaceScalarRelationFilter, SpaceWhereInput>
    element?: XOR<ElementScalarRelationFilter, ElementWhereInput>
  }, "id" | "id">

  export type spaceElementsOrderByWithAggregationInput = {
    id?: SortOrder
    elementId?: SortOrder
    spaceId?: SortOrder
    x?: SortOrder
    y?: SortOrder
    _count?: spaceElementsCountOrderByAggregateInput
    _avg?: spaceElementsAvgOrderByAggregateInput
    _max?: spaceElementsMaxOrderByAggregateInput
    _min?: spaceElementsMinOrderByAggregateInput
    _sum?: spaceElementsSumOrderByAggregateInput
  }

  export type spaceElementsScalarWhereWithAggregatesInput = {
    AND?: spaceElementsScalarWhereWithAggregatesInput | spaceElementsScalarWhereWithAggregatesInput[]
    OR?: spaceElementsScalarWhereWithAggregatesInput[]
    NOT?: spaceElementsScalarWhereWithAggregatesInput | spaceElementsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"spaceElements"> | string
    elementId?: StringWithAggregatesFilter<"spaceElements"> | string
    spaceId?: StringWithAggregatesFilter<"spaceElements"> | string
    x?: IntWithAggregatesFilter<"spaceElements"> | number
    y?: IntWithAggregatesFilter<"spaceElements"> | number
  }

  export type ElementWhereInput = {
    AND?: ElementWhereInput | ElementWhereInput[]
    OR?: ElementWhereInput[]
    NOT?: ElementWhereInput | ElementWhereInput[]
    id?: StringFilter<"Element"> | string
    width?: IntFilter<"Element"> | number
    height?: IntFilter<"Element"> | number
    imageUrl?: StringFilter<"Element"> | string
    spaces?: SpaceElementsListRelationFilter
    mapElements?: MapElementsListRelationFilter
  }

  export type ElementOrderByWithRelationInput = {
    id?: SortOrder
    width?: SortOrder
    height?: SortOrder
    imageUrl?: SortOrder
    spaces?: spaceElementsOrderByRelationAggregateInput
    mapElements?: MapElementsOrderByRelationAggregateInput
  }

  export type ElementWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ElementWhereInput | ElementWhereInput[]
    OR?: ElementWhereInput[]
    NOT?: ElementWhereInput | ElementWhereInput[]
    width?: IntFilter<"Element"> | number
    height?: IntFilter<"Element"> | number
    imageUrl?: StringFilter<"Element"> | string
    spaces?: SpaceElementsListRelationFilter
    mapElements?: MapElementsListRelationFilter
  }, "id" | "id">

  export type ElementOrderByWithAggregationInput = {
    id?: SortOrder
    width?: SortOrder
    height?: SortOrder
    imageUrl?: SortOrder
    _count?: ElementCountOrderByAggregateInput
    _avg?: ElementAvgOrderByAggregateInput
    _max?: ElementMaxOrderByAggregateInput
    _min?: ElementMinOrderByAggregateInput
    _sum?: ElementSumOrderByAggregateInput
  }

  export type ElementScalarWhereWithAggregatesInput = {
    AND?: ElementScalarWhereWithAggregatesInput | ElementScalarWhereWithAggregatesInput[]
    OR?: ElementScalarWhereWithAggregatesInput[]
    NOT?: ElementScalarWhereWithAggregatesInput | ElementScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Element"> | string
    width?: IntWithAggregatesFilter<"Element"> | number
    height?: IntWithAggregatesFilter<"Element"> | number
    imageUrl?: StringWithAggregatesFilter<"Element"> | string
  }

  export type MapWhereInput = {
    AND?: MapWhereInput | MapWhereInput[]
    OR?: MapWhereInput[]
    NOT?: MapWhereInput | MapWhereInput[]
    id?: StringFilter<"Map"> | string
    width?: IntFilter<"Map"> | number
    height?: IntFilter<"Map"> | number
    name?: StringFilter<"Map"> | string
    mapElements?: MapElementsListRelationFilter
  }

  export type MapOrderByWithRelationInput = {
    id?: SortOrder
    width?: SortOrder
    height?: SortOrder
    name?: SortOrder
    mapElements?: MapElementsOrderByRelationAggregateInput
  }

  export type MapWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MapWhereInput | MapWhereInput[]
    OR?: MapWhereInput[]
    NOT?: MapWhereInput | MapWhereInput[]
    width?: IntFilter<"Map"> | number
    height?: IntFilter<"Map"> | number
    name?: StringFilter<"Map"> | string
    mapElements?: MapElementsListRelationFilter
  }, "id" | "id">

  export type MapOrderByWithAggregationInput = {
    id?: SortOrder
    width?: SortOrder
    height?: SortOrder
    name?: SortOrder
    _count?: MapCountOrderByAggregateInput
    _avg?: MapAvgOrderByAggregateInput
    _max?: MapMaxOrderByAggregateInput
    _min?: MapMinOrderByAggregateInput
    _sum?: MapSumOrderByAggregateInput
  }

  export type MapScalarWhereWithAggregatesInput = {
    AND?: MapScalarWhereWithAggregatesInput | MapScalarWhereWithAggregatesInput[]
    OR?: MapScalarWhereWithAggregatesInput[]
    NOT?: MapScalarWhereWithAggregatesInput | MapScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Map"> | string
    width?: IntWithAggregatesFilter<"Map"> | number
    height?: IntWithAggregatesFilter<"Map"> | number
    name?: StringWithAggregatesFilter<"Map"> | string
  }

  export type MapElementsWhereInput = {
    AND?: MapElementsWhereInput | MapElementsWhereInput[]
    OR?: MapElementsWhereInput[]
    NOT?: MapElementsWhereInput | MapElementsWhereInput[]
    id?: StringFilter<"MapElements"> | string
    mapId?: StringFilter<"MapElements"> | string
    elementId?: StringFilter<"MapElements"> | string
    x?: IntNullableFilter<"MapElements"> | number | null
    y?: IntNullableFilter<"MapElements"> | number | null
    map?: XOR<MapScalarRelationFilter, MapWhereInput>
    element?: XOR<ElementScalarRelationFilter, ElementWhereInput>
  }

  export type MapElementsOrderByWithRelationInput = {
    id?: SortOrder
    mapId?: SortOrder
    elementId?: SortOrder
    x?: SortOrderInput | SortOrder
    y?: SortOrderInput | SortOrder
    map?: MapOrderByWithRelationInput
    element?: ElementOrderByWithRelationInput
  }

  export type MapElementsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MapElementsWhereInput | MapElementsWhereInput[]
    OR?: MapElementsWhereInput[]
    NOT?: MapElementsWhereInput | MapElementsWhereInput[]
    mapId?: StringFilter<"MapElements"> | string
    elementId?: StringFilter<"MapElements"> | string
    x?: IntNullableFilter<"MapElements"> | number | null
    y?: IntNullableFilter<"MapElements"> | number | null
    map?: XOR<MapScalarRelationFilter, MapWhereInput>
    element?: XOR<ElementScalarRelationFilter, ElementWhereInput>
  }, "id" | "id">

  export type MapElementsOrderByWithAggregationInput = {
    id?: SortOrder
    mapId?: SortOrder
    elementId?: SortOrder
    x?: SortOrderInput | SortOrder
    y?: SortOrderInput | SortOrder
    _count?: MapElementsCountOrderByAggregateInput
    _avg?: MapElementsAvgOrderByAggregateInput
    _max?: MapElementsMaxOrderByAggregateInput
    _min?: MapElementsMinOrderByAggregateInput
    _sum?: MapElementsSumOrderByAggregateInput
  }

  export type MapElementsScalarWhereWithAggregatesInput = {
    AND?: MapElementsScalarWhereWithAggregatesInput | MapElementsScalarWhereWithAggregatesInput[]
    OR?: MapElementsScalarWhereWithAggregatesInput[]
    NOT?: MapElementsScalarWhereWithAggregatesInput | MapElementsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"MapElements"> | string
    mapId?: StringWithAggregatesFilter<"MapElements"> | string
    elementId?: StringWithAggregatesFilter<"MapElements"> | string
    x?: IntNullableWithAggregatesFilter<"MapElements"> | number | null
    y?: IntNullableWithAggregatesFilter<"MapElements"> | number | null
  }

  export type AvatarWhereInput = {
    AND?: AvatarWhereInput | AvatarWhereInput[]
    OR?: AvatarWhereInput[]
    NOT?: AvatarWhereInput | AvatarWhereInput[]
    id?: StringFilter<"Avatar"> | string
    imageUrl?: StringNullableFilter<"Avatar"> | string | null
    name?: StringNullableFilter<"Avatar"> | string | null
    users?: UserListRelationFilter
  }

  export type AvatarOrderByWithRelationInput = {
    id?: SortOrder
    imageUrl?: SortOrderInput | SortOrder
    name?: SortOrderInput | SortOrder
    users?: UserOrderByRelationAggregateInput
  }

  export type AvatarWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AvatarWhereInput | AvatarWhereInput[]
    OR?: AvatarWhereInput[]
    NOT?: AvatarWhereInput | AvatarWhereInput[]
    imageUrl?: StringNullableFilter<"Avatar"> | string | null
    name?: StringNullableFilter<"Avatar"> | string | null
    users?: UserListRelationFilter
  }, "id" | "id">

  export type AvatarOrderByWithAggregationInput = {
    id?: SortOrder
    imageUrl?: SortOrderInput | SortOrder
    name?: SortOrderInput | SortOrder
    _count?: AvatarCountOrderByAggregateInput
    _max?: AvatarMaxOrderByAggregateInput
    _min?: AvatarMinOrderByAggregateInput
  }

  export type AvatarScalarWhereWithAggregatesInput = {
    AND?: AvatarScalarWhereWithAggregatesInput | AvatarScalarWhereWithAggregatesInput[]
    OR?: AvatarScalarWhereWithAggregatesInput[]
    NOT?: AvatarScalarWhereWithAggregatesInput | AvatarScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Avatar"> | string
    imageUrl?: StringNullableWithAggregatesFilter<"Avatar"> | string | null
    name?: StringNullableWithAggregatesFilter<"Avatar"> | string | null
  }

  export type UserCreateInput = {
    id?: string
    username: string
    password: string
    role: $Enums.Role
    Space?: SpaceCreateNestedManyWithoutCreatorInput
    avatar: AvatarCreateNestedOneWithoutUsersInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    username: string
    password: string
    avatarId: string
    role: $Enums.Role
    Space?: SpaceUncheckedCreateNestedManyWithoutCreatorInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    Space?: SpaceUpdateManyWithoutCreatorNestedInput
    avatar?: AvatarUpdateOneRequiredWithoutUsersNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    avatarId?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    Space?: SpaceUncheckedUpdateManyWithoutCreatorNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    username: string
    password: string
    avatarId: string
    role: $Enums.Role
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    avatarId?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
  }

  export type SpaceCreateInput = {
    id?: string
    name: string
    width: number
    height?: number | null
    thumbnail?: string | null
    creator: UserCreateNestedOneWithoutSpaceInput
    elements?: spaceElementsCreateNestedManyWithoutSpaceInput
  }

  export type SpaceUncheckedCreateInput = {
    id?: string
    name: string
    width: number
    height?: number | null
    thumbnail?: string | null
    creatorId: string
    elements?: spaceElementsUncheckedCreateNestedManyWithoutSpaceInput
  }

  export type SpaceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    width?: IntFieldUpdateOperationsInput | number
    height?: NullableIntFieldUpdateOperationsInput | number | null
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    creator?: UserUpdateOneRequiredWithoutSpaceNestedInput
    elements?: spaceElementsUpdateManyWithoutSpaceNestedInput
  }

  export type SpaceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    width?: IntFieldUpdateOperationsInput | number
    height?: NullableIntFieldUpdateOperationsInput | number | null
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    creatorId?: StringFieldUpdateOperationsInput | string
    elements?: spaceElementsUncheckedUpdateManyWithoutSpaceNestedInput
  }

  export type SpaceCreateManyInput = {
    id?: string
    name: string
    width: number
    height?: number | null
    thumbnail?: string | null
    creatorId: string
  }

  export type SpaceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    width?: IntFieldUpdateOperationsInput | number
    height?: NullableIntFieldUpdateOperationsInput | number | null
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SpaceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    width?: IntFieldUpdateOperationsInput | number
    height?: NullableIntFieldUpdateOperationsInput | number | null
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    creatorId?: StringFieldUpdateOperationsInput | string
  }

  export type spaceElementsCreateInput = {
    id?: string
    x: number
    y: number
    space: SpaceCreateNestedOneWithoutElementsInput
    element: ElementCreateNestedOneWithoutSpacesInput
  }

  export type spaceElementsUncheckedCreateInput = {
    id?: string
    elementId: string
    spaceId: string
    x: number
    y: number
  }

  export type spaceElementsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    x?: IntFieldUpdateOperationsInput | number
    y?: IntFieldUpdateOperationsInput | number
    space?: SpaceUpdateOneRequiredWithoutElementsNestedInput
    element?: ElementUpdateOneRequiredWithoutSpacesNestedInput
  }

  export type spaceElementsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    elementId?: StringFieldUpdateOperationsInput | string
    spaceId?: StringFieldUpdateOperationsInput | string
    x?: IntFieldUpdateOperationsInput | number
    y?: IntFieldUpdateOperationsInput | number
  }

  export type spaceElementsCreateManyInput = {
    id?: string
    elementId: string
    spaceId: string
    x: number
    y: number
  }

  export type spaceElementsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    x?: IntFieldUpdateOperationsInput | number
    y?: IntFieldUpdateOperationsInput | number
  }

  export type spaceElementsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    elementId?: StringFieldUpdateOperationsInput | string
    spaceId?: StringFieldUpdateOperationsInput | string
    x?: IntFieldUpdateOperationsInput | number
    y?: IntFieldUpdateOperationsInput | number
  }

  export type ElementCreateInput = {
    id?: string
    width: number
    height: number
    imageUrl: string
    spaces?: spaceElementsCreateNestedManyWithoutElementInput
    mapElements?: MapElementsCreateNestedManyWithoutElementInput
  }

  export type ElementUncheckedCreateInput = {
    id?: string
    width: number
    height: number
    imageUrl: string
    spaces?: spaceElementsUncheckedCreateNestedManyWithoutElementInput
    mapElements?: MapElementsUncheckedCreateNestedManyWithoutElementInput
  }

  export type ElementUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    width?: IntFieldUpdateOperationsInput | number
    height?: IntFieldUpdateOperationsInput | number
    imageUrl?: StringFieldUpdateOperationsInput | string
    spaces?: spaceElementsUpdateManyWithoutElementNestedInput
    mapElements?: MapElementsUpdateManyWithoutElementNestedInput
  }

  export type ElementUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    width?: IntFieldUpdateOperationsInput | number
    height?: IntFieldUpdateOperationsInput | number
    imageUrl?: StringFieldUpdateOperationsInput | string
    spaces?: spaceElementsUncheckedUpdateManyWithoutElementNestedInput
    mapElements?: MapElementsUncheckedUpdateManyWithoutElementNestedInput
  }

  export type ElementCreateManyInput = {
    id?: string
    width: number
    height: number
    imageUrl: string
  }

  export type ElementUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    width?: IntFieldUpdateOperationsInput | number
    height?: IntFieldUpdateOperationsInput | number
    imageUrl?: StringFieldUpdateOperationsInput | string
  }

  export type ElementUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    width?: IntFieldUpdateOperationsInput | number
    height?: IntFieldUpdateOperationsInput | number
    imageUrl?: StringFieldUpdateOperationsInput | string
  }

  export type MapCreateInput = {
    id?: string
    width: number
    height: number
    name: string
    mapElements?: MapElementsCreateNestedManyWithoutMapInput
  }

  export type MapUncheckedCreateInput = {
    id?: string
    width: number
    height: number
    name: string
    mapElements?: MapElementsUncheckedCreateNestedManyWithoutMapInput
  }

  export type MapUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    width?: IntFieldUpdateOperationsInput | number
    height?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    mapElements?: MapElementsUpdateManyWithoutMapNestedInput
  }

  export type MapUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    width?: IntFieldUpdateOperationsInput | number
    height?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    mapElements?: MapElementsUncheckedUpdateManyWithoutMapNestedInput
  }

  export type MapCreateManyInput = {
    id?: string
    width: number
    height: number
    name: string
  }

  export type MapUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    width?: IntFieldUpdateOperationsInput | number
    height?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
  }

  export type MapUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    width?: IntFieldUpdateOperationsInput | number
    height?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
  }

  export type MapElementsCreateInput = {
    id?: string
    x?: number | null
    y?: number | null
    map: MapCreateNestedOneWithoutMapElementsInput
    element: ElementCreateNestedOneWithoutMapElementsInput
  }

  export type MapElementsUncheckedCreateInput = {
    id?: string
    mapId: string
    elementId: string
    x?: number | null
    y?: number | null
  }

  export type MapElementsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    x?: NullableIntFieldUpdateOperationsInput | number | null
    y?: NullableIntFieldUpdateOperationsInput | number | null
    map?: MapUpdateOneRequiredWithoutMapElementsNestedInput
    element?: ElementUpdateOneRequiredWithoutMapElementsNestedInput
  }

  export type MapElementsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    mapId?: StringFieldUpdateOperationsInput | string
    elementId?: StringFieldUpdateOperationsInput | string
    x?: NullableIntFieldUpdateOperationsInput | number | null
    y?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type MapElementsCreateManyInput = {
    id?: string
    mapId: string
    elementId: string
    x?: number | null
    y?: number | null
  }

  export type MapElementsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    x?: NullableIntFieldUpdateOperationsInput | number | null
    y?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type MapElementsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    mapId?: StringFieldUpdateOperationsInput | string
    elementId?: StringFieldUpdateOperationsInput | string
    x?: NullableIntFieldUpdateOperationsInput | number | null
    y?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type AvatarCreateInput = {
    id?: string
    imageUrl?: string | null
    name?: string | null
    users?: UserCreateNestedManyWithoutAvatarInput
  }

  export type AvatarUncheckedCreateInput = {
    id?: string
    imageUrl?: string | null
    name?: string | null
    users?: UserUncheckedCreateNestedManyWithoutAvatarInput
  }

  export type AvatarUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    users?: UserUpdateManyWithoutAvatarNestedInput
  }

  export type AvatarUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    users?: UserUncheckedUpdateManyWithoutAvatarNestedInput
  }

  export type AvatarCreateManyInput = {
    id?: string
    imageUrl?: string | null
    name?: string | null
  }

  export type AvatarUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AvatarUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type SpaceListRelationFilter = {
    every?: SpaceWhereInput
    some?: SpaceWhereInput
    none?: SpaceWhereInput
  }

  export type AvatarScalarRelationFilter = {
    is?: AvatarWhereInput
    isNot?: AvatarWhereInput
  }

  export type SpaceOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
    avatarId?: SortOrder
    role?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
    avatarId?: SortOrder
    role?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
    avatarId?: SortOrder
    role?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type SpaceElementsListRelationFilter = {
    every?: spaceElementsWhereInput
    some?: spaceElementsWhereInput
    none?: spaceElementsWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type spaceElementsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SpaceCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    width?: SortOrder
    height?: SortOrder
    thumbnail?: SortOrder
    creatorId?: SortOrder
  }

  export type SpaceAvgOrderByAggregateInput = {
    width?: SortOrder
    height?: SortOrder
  }

  export type SpaceMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    width?: SortOrder
    height?: SortOrder
    thumbnail?: SortOrder
    creatorId?: SortOrder
  }

  export type SpaceMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    width?: SortOrder
    height?: SortOrder
    thumbnail?: SortOrder
    creatorId?: SortOrder
  }

  export type SpaceSumOrderByAggregateInput = {
    width?: SortOrder
    height?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type SpaceScalarRelationFilter = {
    is?: SpaceWhereInput
    isNot?: SpaceWhereInput
  }

  export type ElementScalarRelationFilter = {
    is?: ElementWhereInput
    isNot?: ElementWhereInput
  }

  export type spaceElementsCountOrderByAggregateInput = {
    id?: SortOrder
    elementId?: SortOrder
    spaceId?: SortOrder
    x?: SortOrder
    y?: SortOrder
  }

  export type spaceElementsAvgOrderByAggregateInput = {
    x?: SortOrder
    y?: SortOrder
  }

  export type spaceElementsMaxOrderByAggregateInput = {
    id?: SortOrder
    elementId?: SortOrder
    spaceId?: SortOrder
    x?: SortOrder
    y?: SortOrder
  }

  export type spaceElementsMinOrderByAggregateInput = {
    id?: SortOrder
    elementId?: SortOrder
    spaceId?: SortOrder
    x?: SortOrder
    y?: SortOrder
  }

  export type spaceElementsSumOrderByAggregateInput = {
    x?: SortOrder
    y?: SortOrder
  }

  export type MapElementsListRelationFilter = {
    every?: MapElementsWhereInput
    some?: MapElementsWhereInput
    none?: MapElementsWhereInput
  }

  export type MapElementsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ElementCountOrderByAggregateInput = {
    id?: SortOrder
    width?: SortOrder
    height?: SortOrder
    imageUrl?: SortOrder
  }

  export type ElementAvgOrderByAggregateInput = {
    width?: SortOrder
    height?: SortOrder
  }

  export type ElementMaxOrderByAggregateInput = {
    id?: SortOrder
    width?: SortOrder
    height?: SortOrder
    imageUrl?: SortOrder
  }

  export type ElementMinOrderByAggregateInput = {
    id?: SortOrder
    width?: SortOrder
    height?: SortOrder
    imageUrl?: SortOrder
  }

  export type ElementSumOrderByAggregateInput = {
    width?: SortOrder
    height?: SortOrder
  }

  export type MapCountOrderByAggregateInput = {
    id?: SortOrder
    width?: SortOrder
    height?: SortOrder
    name?: SortOrder
  }

  export type MapAvgOrderByAggregateInput = {
    width?: SortOrder
    height?: SortOrder
  }

  export type MapMaxOrderByAggregateInput = {
    id?: SortOrder
    width?: SortOrder
    height?: SortOrder
    name?: SortOrder
  }

  export type MapMinOrderByAggregateInput = {
    id?: SortOrder
    width?: SortOrder
    height?: SortOrder
    name?: SortOrder
  }

  export type MapSumOrderByAggregateInput = {
    width?: SortOrder
    height?: SortOrder
  }

  export type MapScalarRelationFilter = {
    is?: MapWhereInput
    isNot?: MapWhereInput
  }

  export type MapElementsCountOrderByAggregateInput = {
    id?: SortOrder
    mapId?: SortOrder
    elementId?: SortOrder
    x?: SortOrder
    y?: SortOrder
  }

  export type MapElementsAvgOrderByAggregateInput = {
    x?: SortOrder
    y?: SortOrder
  }

  export type MapElementsMaxOrderByAggregateInput = {
    id?: SortOrder
    mapId?: SortOrder
    elementId?: SortOrder
    x?: SortOrder
    y?: SortOrder
  }

  export type MapElementsMinOrderByAggregateInput = {
    id?: SortOrder
    mapId?: SortOrder
    elementId?: SortOrder
    x?: SortOrder
    y?: SortOrder
  }

  export type MapElementsSumOrderByAggregateInput = {
    x?: SortOrder
    y?: SortOrder
  }

  export type UserListRelationFilter = {
    every?: UserWhereInput
    some?: UserWhereInput
    none?: UserWhereInput
  }

  export type UserOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AvatarCountOrderByAggregateInput = {
    id?: SortOrder
    imageUrl?: SortOrder
    name?: SortOrder
  }

  export type AvatarMaxOrderByAggregateInput = {
    id?: SortOrder
    imageUrl?: SortOrder
    name?: SortOrder
  }

  export type AvatarMinOrderByAggregateInput = {
    id?: SortOrder
    imageUrl?: SortOrder
    name?: SortOrder
  }

  export type SpaceCreateNestedManyWithoutCreatorInput = {
    create?: XOR<SpaceCreateWithoutCreatorInput, SpaceUncheckedCreateWithoutCreatorInput> | SpaceCreateWithoutCreatorInput[] | SpaceUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: SpaceCreateOrConnectWithoutCreatorInput | SpaceCreateOrConnectWithoutCreatorInput[]
    createMany?: SpaceCreateManyCreatorInputEnvelope
    connect?: SpaceWhereUniqueInput | SpaceWhereUniqueInput[]
  }

  export type AvatarCreateNestedOneWithoutUsersInput = {
    create?: XOR<AvatarCreateWithoutUsersInput, AvatarUncheckedCreateWithoutUsersInput>
    connectOrCreate?: AvatarCreateOrConnectWithoutUsersInput
    connect?: AvatarWhereUniqueInput
  }

  export type SpaceUncheckedCreateNestedManyWithoutCreatorInput = {
    create?: XOR<SpaceCreateWithoutCreatorInput, SpaceUncheckedCreateWithoutCreatorInput> | SpaceCreateWithoutCreatorInput[] | SpaceUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: SpaceCreateOrConnectWithoutCreatorInput | SpaceCreateOrConnectWithoutCreatorInput[]
    createMany?: SpaceCreateManyCreatorInputEnvelope
    connect?: SpaceWhereUniqueInput | SpaceWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type SpaceUpdateManyWithoutCreatorNestedInput = {
    create?: XOR<SpaceCreateWithoutCreatorInput, SpaceUncheckedCreateWithoutCreatorInput> | SpaceCreateWithoutCreatorInput[] | SpaceUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: SpaceCreateOrConnectWithoutCreatorInput | SpaceCreateOrConnectWithoutCreatorInput[]
    upsert?: SpaceUpsertWithWhereUniqueWithoutCreatorInput | SpaceUpsertWithWhereUniqueWithoutCreatorInput[]
    createMany?: SpaceCreateManyCreatorInputEnvelope
    set?: SpaceWhereUniqueInput | SpaceWhereUniqueInput[]
    disconnect?: SpaceWhereUniqueInput | SpaceWhereUniqueInput[]
    delete?: SpaceWhereUniqueInput | SpaceWhereUniqueInput[]
    connect?: SpaceWhereUniqueInput | SpaceWhereUniqueInput[]
    update?: SpaceUpdateWithWhereUniqueWithoutCreatorInput | SpaceUpdateWithWhereUniqueWithoutCreatorInput[]
    updateMany?: SpaceUpdateManyWithWhereWithoutCreatorInput | SpaceUpdateManyWithWhereWithoutCreatorInput[]
    deleteMany?: SpaceScalarWhereInput | SpaceScalarWhereInput[]
  }

  export type AvatarUpdateOneRequiredWithoutUsersNestedInput = {
    create?: XOR<AvatarCreateWithoutUsersInput, AvatarUncheckedCreateWithoutUsersInput>
    connectOrCreate?: AvatarCreateOrConnectWithoutUsersInput
    upsert?: AvatarUpsertWithoutUsersInput
    connect?: AvatarWhereUniqueInput
    update?: XOR<XOR<AvatarUpdateToOneWithWhereWithoutUsersInput, AvatarUpdateWithoutUsersInput>, AvatarUncheckedUpdateWithoutUsersInput>
  }

  export type SpaceUncheckedUpdateManyWithoutCreatorNestedInput = {
    create?: XOR<SpaceCreateWithoutCreatorInput, SpaceUncheckedCreateWithoutCreatorInput> | SpaceCreateWithoutCreatorInput[] | SpaceUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: SpaceCreateOrConnectWithoutCreatorInput | SpaceCreateOrConnectWithoutCreatorInput[]
    upsert?: SpaceUpsertWithWhereUniqueWithoutCreatorInput | SpaceUpsertWithWhereUniqueWithoutCreatorInput[]
    createMany?: SpaceCreateManyCreatorInputEnvelope
    set?: SpaceWhereUniqueInput | SpaceWhereUniqueInput[]
    disconnect?: SpaceWhereUniqueInput | SpaceWhereUniqueInput[]
    delete?: SpaceWhereUniqueInput | SpaceWhereUniqueInput[]
    connect?: SpaceWhereUniqueInput | SpaceWhereUniqueInput[]
    update?: SpaceUpdateWithWhereUniqueWithoutCreatorInput | SpaceUpdateWithWhereUniqueWithoutCreatorInput[]
    updateMany?: SpaceUpdateManyWithWhereWithoutCreatorInput | SpaceUpdateManyWithWhereWithoutCreatorInput[]
    deleteMany?: SpaceScalarWhereInput | SpaceScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutSpaceInput = {
    create?: XOR<UserCreateWithoutSpaceInput, UserUncheckedCreateWithoutSpaceInput>
    connectOrCreate?: UserCreateOrConnectWithoutSpaceInput
    connect?: UserWhereUniqueInput
  }

  export type spaceElementsCreateNestedManyWithoutSpaceInput = {
    create?: XOR<spaceElementsCreateWithoutSpaceInput, spaceElementsUncheckedCreateWithoutSpaceInput> | spaceElementsCreateWithoutSpaceInput[] | spaceElementsUncheckedCreateWithoutSpaceInput[]
    connectOrCreate?: spaceElementsCreateOrConnectWithoutSpaceInput | spaceElementsCreateOrConnectWithoutSpaceInput[]
    createMany?: spaceElementsCreateManySpaceInputEnvelope
    connect?: spaceElementsWhereUniqueInput | spaceElementsWhereUniqueInput[]
  }

  export type spaceElementsUncheckedCreateNestedManyWithoutSpaceInput = {
    create?: XOR<spaceElementsCreateWithoutSpaceInput, spaceElementsUncheckedCreateWithoutSpaceInput> | spaceElementsCreateWithoutSpaceInput[] | spaceElementsUncheckedCreateWithoutSpaceInput[]
    connectOrCreate?: spaceElementsCreateOrConnectWithoutSpaceInput | spaceElementsCreateOrConnectWithoutSpaceInput[]
    createMany?: spaceElementsCreateManySpaceInputEnvelope
    connect?: spaceElementsWhereUniqueInput | spaceElementsWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type UserUpdateOneRequiredWithoutSpaceNestedInput = {
    create?: XOR<UserCreateWithoutSpaceInput, UserUncheckedCreateWithoutSpaceInput>
    connectOrCreate?: UserCreateOrConnectWithoutSpaceInput
    upsert?: UserUpsertWithoutSpaceInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSpaceInput, UserUpdateWithoutSpaceInput>, UserUncheckedUpdateWithoutSpaceInput>
  }

  export type spaceElementsUpdateManyWithoutSpaceNestedInput = {
    create?: XOR<spaceElementsCreateWithoutSpaceInput, spaceElementsUncheckedCreateWithoutSpaceInput> | spaceElementsCreateWithoutSpaceInput[] | spaceElementsUncheckedCreateWithoutSpaceInput[]
    connectOrCreate?: spaceElementsCreateOrConnectWithoutSpaceInput | spaceElementsCreateOrConnectWithoutSpaceInput[]
    upsert?: spaceElementsUpsertWithWhereUniqueWithoutSpaceInput | spaceElementsUpsertWithWhereUniqueWithoutSpaceInput[]
    createMany?: spaceElementsCreateManySpaceInputEnvelope
    set?: spaceElementsWhereUniqueInput | spaceElementsWhereUniqueInput[]
    disconnect?: spaceElementsWhereUniqueInput | spaceElementsWhereUniqueInput[]
    delete?: spaceElementsWhereUniqueInput | spaceElementsWhereUniqueInput[]
    connect?: spaceElementsWhereUniqueInput | spaceElementsWhereUniqueInput[]
    update?: spaceElementsUpdateWithWhereUniqueWithoutSpaceInput | spaceElementsUpdateWithWhereUniqueWithoutSpaceInput[]
    updateMany?: spaceElementsUpdateManyWithWhereWithoutSpaceInput | spaceElementsUpdateManyWithWhereWithoutSpaceInput[]
    deleteMany?: spaceElementsScalarWhereInput | spaceElementsScalarWhereInput[]
  }

  export type spaceElementsUncheckedUpdateManyWithoutSpaceNestedInput = {
    create?: XOR<spaceElementsCreateWithoutSpaceInput, spaceElementsUncheckedCreateWithoutSpaceInput> | spaceElementsCreateWithoutSpaceInput[] | spaceElementsUncheckedCreateWithoutSpaceInput[]
    connectOrCreate?: spaceElementsCreateOrConnectWithoutSpaceInput | spaceElementsCreateOrConnectWithoutSpaceInput[]
    upsert?: spaceElementsUpsertWithWhereUniqueWithoutSpaceInput | spaceElementsUpsertWithWhereUniqueWithoutSpaceInput[]
    createMany?: spaceElementsCreateManySpaceInputEnvelope
    set?: spaceElementsWhereUniqueInput | spaceElementsWhereUniqueInput[]
    disconnect?: spaceElementsWhereUniqueInput | spaceElementsWhereUniqueInput[]
    delete?: spaceElementsWhereUniqueInput | spaceElementsWhereUniqueInput[]
    connect?: spaceElementsWhereUniqueInput | spaceElementsWhereUniqueInput[]
    update?: spaceElementsUpdateWithWhereUniqueWithoutSpaceInput | spaceElementsUpdateWithWhereUniqueWithoutSpaceInput[]
    updateMany?: spaceElementsUpdateManyWithWhereWithoutSpaceInput | spaceElementsUpdateManyWithWhereWithoutSpaceInput[]
    deleteMany?: spaceElementsScalarWhereInput | spaceElementsScalarWhereInput[]
  }

  export type SpaceCreateNestedOneWithoutElementsInput = {
    create?: XOR<SpaceCreateWithoutElementsInput, SpaceUncheckedCreateWithoutElementsInput>
    connectOrCreate?: SpaceCreateOrConnectWithoutElementsInput
    connect?: SpaceWhereUniqueInput
  }

  export type ElementCreateNestedOneWithoutSpacesInput = {
    create?: XOR<ElementCreateWithoutSpacesInput, ElementUncheckedCreateWithoutSpacesInput>
    connectOrCreate?: ElementCreateOrConnectWithoutSpacesInput
    connect?: ElementWhereUniqueInput
  }

  export type SpaceUpdateOneRequiredWithoutElementsNestedInput = {
    create?: XOR<SpaceCreateWithoutElementsInput, SpaceUncheckedCreateWithoutElementsInput>
    connectOrCreate?: SpaceCreateOrConnectWithoutElementsInput
    upsert?: SpaceUpsertWithoutElementsInput
    connect?: SpaceWhereUniqueInput
    update?: XOR<XOR<SpaceUpdateToOneWithWhereWithoutElementsInput, SpaceUpdateWithoutElementsInput>, SpaceUncheckedUpdateWithoutElementsInput>
  }

  export type ElementUpdateOneRequiredWithoutSpacesNestedInput = {
    create?: XOR<ElementCreateWithoutSpacesInput, ElementUncheckedCreateWithoutSpacesInput>
    connectOrCreate?: ElementCreateOrConnectWithoutSpacesInput
    upsert?: ElementUpsertWithoutSpacesInput
    connect?: ElementWhereUniqueInput
    update?: XOR<XOR<ElementUpdateToOneWithWhereWithoutSpacesInput, ElementUpdateWithoutSpacesInput>, ElementUncheckedUpdateWithoutSpacesInput>
  }

  export type spaceElementsCreateNestedManyWithoutElementInput = {
    create?: XOR<spaceElementsCreateWithoutElementInput, spaceElementsUncheckedCreateWithoutElementInput> | spaceElementsCreateWithoutElementInput[] | spaceElementsUncheckedCreateWithoutElementInput[]
    connectOrCreate?: spaceElementsCreateOrConnectWithoutElementInput | spaceElementsCreateOrConnectWithoutElementInput[]
    createMany?: spaceElementsCreateManyElementInputEnvelope
    connect?: spaceElementsWhereUniqueInput | spaceElementsWhereUniqueInput[]
  }

  export type MapElementsCreateNestedManyWithoutElementInput = {
    create?: XOR<MapElementsCreateWithoutElementInput, MapElementsUncheckedCreateWithoutElementInput> | MapElementsCreateWithoutElementInput[] | MapElementsUncheckedCreateWithoutElementInput[]
    connectOrCreate?: MapElementsCreateOrConnectWithoutElementInput | MapElementsCreateOrConnectWithoutElementInput[]
    createMany?: MapElementsCreateManyElementInputEnvelope
    connect?: MapElementsWhereUniqueInput | MapElementsWhereUniqueInput[]
  }

  export type spaceElementsUncheckedCreateNestedManyWithoutElementInput = {
    create?: XOR<spaceElementsCreateWithoutElementInput, spaceElementsUncheckedCreateWithoutElementInput> | spaceElementsCreateWithoutElementInput[] | spaceElementsUncheckedCreateWithoutElementInput[]
    connectOrCreate?: spaceElementsCreateOrConnectWithoutElementInput | spaceElementsCreateOrConnectWithoutElementInput[]
    createMany?: spaceElementsCreateManyElementInputEnvelope
    connect?: spaceElementsWhereUniqueInput | spaceElementsWhereUniqueInput[]
  }

  export type MapElementsUncheckedCreateNestedManyWithoutElementInput = {
    create?: XOR<MapElementsCreateWithoutElementInput, MapElementsUncheckedCreateWithoutElementInput> | MapElementsCreateWithoutElementInput[] | MapElementsUncheckedCreateWithoutElementInput[]
    connectOrCreate?: MapElementsCreateOrConnectWithoutElementInput | MapElementsCreateOrConnectWithoutElementInput[]
    createMany?: MapElementsCreateManyElementInputEnvelope
    connect?: MapElementsWhereUniqueInput | MapElementsWhereUniqueInput[]
  }

  export type spaceElementsUpdateManyWithoutElementNestedInput = {
    create?: XOR<spaceElementsCreateWithoutElementInput, spaceElementsUncheckedCreateWithoutElementInput> | spaceElementsCreateWithoutElementInput[] | spaceElementsUncheckedCreateWithoutElementInput[]
    connectOrCreate?: spaceElementsCreateOrConnectWithoutElementInput | spaceElementsCreateOrConnectWithoutElementInput[]
    upsert?: spaceElementsUpsertWithWhereUniqueWithoutElementInput | spaceElementsUpsertWithWhereUniqueWithoutElementInput[]
    createMany?: spaceElementsCreateManyElementInputEnvelope
    set?: spaceElementsWhereUniqueInput | spaceElementsWhereUniqueInput[]
    disconnect?: spaceElementsWhereUniqueInput | spaceElementsWhereUniqueInput[]
    delete?: spaceElementsWhereUniqueInput | spaceElementsWhereUniqueInput[]
    connect?: spaceElementsWhereUniqueInput | spaceElementsWhereUniqueInput[]
    update?: spaceElementsUpdateWithWhereUniqueWithoutElementInput | spaceElementsUpdateWithWhereUniqueWithoutElementInput[]
    updateMany?: spaceElementsUpdateManyWithWhereWithoutElementInput | spaceElementsUpdateManyWithWhereWithoutElementInput[]
    deleteMany?: spaceElementsScalarWhereInput | spaceElementsScalarWhereInput[]
  }

  export type MapElementsUpdateManyWithoutElementNestedInput = {
    create?: XOR<MapElementsCreateWithoutElementInput, MapElementsUncheckedCreateWithoutElementInput> | MapElementsCreateWithoutElementInput[] | MapElementsUncheckedCreateWithoutElementInput[]
    connectOrCreate?: MapElementsCreateOrConnectWithoutElementInput | MapElementsCreateOrConnectWithoutElementInput[]
    upsert?: MapElementsUpsertWithWhereUniqueWithoutElementInput | MapElementsUpsertWithWhereUniqueWithoutElementInput[]
    createMany?: MapElementsCreateManyElementInputEnvelope
    set?: MapElementsWhereUniqueInput | MapElementsWhereUniqueInput[]
    disconnect?: MapElementsWhereUniqueInput | MapElementsWhereUniqueInput[]
    delete?: MapElementsWhereUniqueInput | MapElementsWhereUniqueInput[]
    connect?: MapElementsWhereUniqueInput | MapElementsWhereUniqueInput[]
    update?: MapElementsUpdateWithWhereUniqueWithoutElementInput | MapElementsUpdateWithWhereUniqueWithoutElementInput[]
    updateMany?: MapElementsUpdateManyWithWhereWithoutElementInput | MapElementsUpdateManyWithWhereWithoutElementInput[]
    deleteMany?: MapElementsScalarWhereInput | MapElementsScalarWhereInput[]
  }

  export type spaceElementsUncheckedUpdateManyWithoutElementNestedInput = {
    create?: XOR<spaceElementsCreateWithoutElementInput, spaceElementsUncheckedCreateWithoutElementInput> | spaceElementsCreateWithoutElementInput[] | spaceElementsUncheckedCreateWithoutElementInput[]
    connectOrCreate?: spaceElementsCreateOrConnectWithoutElementInput | spaceElementsCreateOrConnectWithoutElementInput[]
    upsert?: spaceElementsUpsertWithWhereUniqueWithoutElementInput | spaceElementsUpsertWithWhereUniqueWithoutElementInput[]
    createMany?: spaceElementsCreateManyElementInputEnvelope
    set?: spaceElementsWhereUniqueInput | spaceElementsWhereUniqueInput[]
    disconnect?: spaceElementsWhereUniqueInput | spaceElementsWhereUniqueInput[]
    delete?: spaceElementsWhereUniqueInput | spaceElementsWhereUniqueInput[]
    connect?: spaceElementsWhereUniqueInput | spaceElementsWhereUniqueInput[]
    update?: spaceElementsUpdateWithWhereUniqueWithoutElementInput | spaceElementsUpdateWithWhereUniqueWithoutElementInput[]
    updateMany?: spaceElementsUpdateManyWithWhereWithoutElementInput | spaceElementsUpdateManyWithWhereWithoutElementInput[]
    deleteMany?: spaceElementsScalarWhereInput | spaceElementsScalarWhereInput[]
  }

  export type MapElementsUncheckedUpdateManyWithoutElementNestedInput = {
    create?: XOR<MapElementsCreateWithoutElementInput, MapElementsUncheckedCreateWithoutElementInput> | MapElementsCreateWithoutElementInput[] | MapElementsUncheckedCreateWithoutElementInput[]
    connectOrCreate?: MapElementsCreateOrConnectWithoutElementInput | MapElementsCreateOrConnectWithoutElementInput[]
    upsert?: MapElementsUpsertWithWhereUniqueWithoutElementInput | MapElementsUpsertWithWhereUniqueWithoutElementInput[]
    createMany?: MapElementsCreateManyElementInputEnvelope
    set?: MapElementsWhereUniqueInput | MapElementsWhereUniqueInput[]
    disconnect?: MapElementsWhereUniqueInput | MapElementsWhereUniqueInput[]
    delete?: MapElementsWhereUniqueInput | MapElementsWhereUniqueInput[]
    connect?: MapElementsWhereUniqueInput | MapElementsWhereUniqueInput[]
    update?: MapElementsUpdateWithWhereUniqueWithoutElementInput | MapElementsUpdateWithWhereUniqueWithoutElementInput[]
    updateMany?: MapElementsUpdateManyWithWhereWithoutElementInput | MapElementsUpdateManyWithWhereWithoutElementInput[]
    deleteMany?: MapElementsScalarWhereInput | MapElementsScalarWhereInput[]
  }

  export type MapElementsCreateNestedManyWithoutMapInput = {
    create?: XOR<MapElementsCreateWithoutMapInput, MapElementsUncheckedCreateWithoutMapInput> | MapElementsCreateWithoutMapInput[] | MapElementsUncheckedCreateWithoutMapInput[]
    connectOrCreate?: MapElementsCreateOrConnectWithoutMapInput | MapElementsCreateOrConnectWithoutMapInput[]
    createMany?: MapElementsCreateManyMapInputEnvelope
    connect?: MapElementsWhereUniqueInput | MapElementsWhereUniqueInput[]
  }

  export type MapElementsUncheckedCreateNestedManyWithoutMapInput = {
    create?: XOR<MapElementsCreateWithoutMapInput, MapElementsUncheckedCreateWithoutMapInput> | MapElementsCreateWithoutMapInput[] | MapElementsUncheckedCreateWithoutMapInput[]
    connectOrCreate?: MapElementsCreateOrConnectWithoutMapInput | MapElementsCreateOrConnectWithoutMapInput[]
    createMany?: MapElementsCreateManyMapInputEnvelope
    connect?: MapElementsWhereUniqueInput | MapElementsWhereUniqueInput[]
  }

  export type MapElementsUpdateManyWithoutMapNestedInput = {
    create?: XOR<MapElementsCreateWithoutMapInput, MapElementsUncheckedCreateWithoutMapInput> | MapElementsCreateWithoutMapInput[] | MapElementsUncheckedCreateWithoutMapInput[]
    connectOrCreate?: MapElementsCreateOrConnectWithoutMapInput | MapElementsCreateOrConnectWithoutMapInput[]
    upsert?: MapElementsUpsertWithWhereUniqueWithoutMapInput | MapElementsUpsertWithWhereUniqueWithoutMapInput[]
    createMany?: MapElementsCreateManyMapInputEnvelope
    set?: MapElementsWhereUniqueInput | MapElementsWhereUniqueInput[]
    disconnect?: MapElementsWhereUniqueInput | MapElementsWhereUniqueInput[]
    delete?: MapElementsWhereUniqueInput | MapElementsWhereUniqueInput[]
    connect?: MapElementsWhereUniqueInput | MapElementsWhereUniqueInput[]
    update?: MapElementsUpdateWithWhereUniqueWithoutMapInput | MapElementsUpdateWithWhereUniqueWithoutMapInput[]
    updateMany?: MapElementsUpdateManyWithWhereWithoutMapInput | MapElementsUpdateManyWithWhereWithoutMapInput[]
    deleteMany?: MapElementsScalarWhereInput | MapElementsScalarWhereInput[]
  }

  export type MapElementsUncheckedUpdateManyWithoutMapNestedInput = {
    create?: XOR<MapElementsCreateWithoutMapInput, MapElementsUncheckedCreateWithoutMapInput> | MapElementsCreateWithoutMapInput[] | MapElementsUncheckedCreateWithoutMapInput[]
    connectOrCreate?: MapElementsCreateOrConnectWithoutMapInput | MapElementsCreateOrConnectWithoutMapInput[]
    upsert?: MapElementsUpsertWithWhereUniqueWithoutMapInput | MapElementsUpsertWithWhereUniqueWithoutMapInput[]
    createMany?: MapElementsCreateManyMapInputEnvelope
    set?: MapElementsWhereUniqueInput | MapElementsWhereUniqueInput[]
    disconnect?: MapElementsWhereUniqueInput | MapElementsWhereUniqueInput[]
    delete?: MapElementsWhereUniqueInput | MapElementsWhereUniqueInput[]
    connect?: MapElementsWhereUniqueInput | MapElementsWhereUniqueInput[]
    update?: MapElementsUpdateWithWhereUniqueWithoutMapInput | MapElementsUpdateWithWhereUniqueWithoutMapInput[]
    updateMany?: MapElementsUpdateManyWithWhereWithoutMapInput | MapElementsUpdateManyWithWhereWithoutMapInput[]
    deleteMany?: MapElementsScalarWhereInput | MapElementsScalarWhereInput[]
  }

  export type MapCreateNestedOneWithoutMapElementsInput = {
    create?: XOR<MapCreateWithoutMapElementsInput, MapUncheckedCreateWithoutMapElementsInput>
    connectOrCreate?: MapCreateOrConnectWithoutMapElementsInput
    connect?: MapWhereUniqueInput
  }

  export type ElementCreateNestedOneWithoutMapElementsInput = {
    create?: XOR<ElementCreateWithoutMapElementsInput, ElementUncheckedCreateWithoutMapElementsInput>
    connectOrCreate?: ElementCreateOrConnectWithoutMapElementsInput
    connect?: ElementWhereUniqueInput
  }

  export type MapUpdateOneRequiredWithoutMapElementsNestedInput = {
    create?: XOR<MapCreateWithoutMapElementsInput, MapUncheckedCreateWithoutMapElementsInput>
    connectOrCreate?: MapCreateOrConnectWithoutMapElementsInput
    upsert?: MapUpsertWithoutMapElementsInput
    connect?: MapWhereUniqueInput
    update?: XOR<XOR<MapUpdateToOneWithWhereWithoutMapElementsInput, MapUpdateWithoutMapElementsInput>, MapUncheckedUpdateWithoutMapElementsInput>
  }

  export type ElementUpdateOneRequiredWithoutMapElementsNestedInput = {
    create?: XOR<ElementCreateWithoutMapElementsInput, ElementUncheckedCreateWithoutMapElementsInput>
    connectOrCreate?: ElementCreateOrConnectWithoutMapElementsInput
    upsert?: ElementUpsertWithoutMapElementsInput
    connect?: ElementWhereUniqueInput
    update?: XOR<XOR<ElementUpdateToOneWithWhereWithoutMapElementsInput, ElementUpdateWithoutMapElementsInput>, ElementUncheckedUpdateWithoutMapElementsInput>
  }

  export type UserCreateNestedManyWithoutAvatarInput = {
    create?: XOR<UserCreateWithoutAvatarInput, UserUncheckedCreateWithoutAvatarInput> | UserCreateWithoutAvatarInput[] | UserUncheckedCreateWithoutAvatarInput[]
    connectOrCreate?: UserCreateOrConnectWithoutAvatarInput | UserCreateOrConnectWithoutAvatarInput[]
    createMany?: UserCreateManyAvatarInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type UserUncheckedCreateNestedManyWithoutAvatarInput = {
    create?: XOR<UserCreateWithoutAvatarInput, UserUncheckedCreateWithoutAvatarInput> | UserCreateWithoutAvatarInput[] | UserUncheckedCreateWithoutAvatarInput[]
    connectOrCreate?: UserCreateOrConnectWithoutAvatarInput | UserCreateOrConnectWithoutAvatarInput[]
    createMany?: UserCreateManyAvatarInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type UserUpdateManyWithoutAvatarNestedInput = {
    create?: XOR<UserCreateWithoutAvatarInput, UserUncheckedCreateWithoutAvatarInput> | UserCreateWithoutAvatarInput[] | UserUncheckedCreateWithoutAvatarInput[]
    connectOrCreate?: UserCreateOrConnectWithoutAvatarInput | UserCreateOrConnectWithoutAvatarInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutAvatarInput | UserUpsertWithWhereUniqueWithoutAvatarInput[]
    createMany?: UserCreateManyAvatarInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutAvatarInput | UserUpdateWithWhereUniqueWithoutAvatarInput[]
    updateMany?: UserUpdateManyWithWhereWithoutAvatarInput | UserUpdateManyWithWhereWithoutAvatarInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type UserUncheckedUpdateManyWithoutAvatarNestedInput = {
    create?: XOR<UserCreateWithoutAvatarInput, UserUncheckedCreateWithoutAvatarInput> | UserCreateWithoutAvatarInput[] | UserUncheckedCreateWithoutAvatarInput[]
    connectOrCreate?: UserCreateOrConnectWithoutAvatarInput | UserCreateOrConnectWithoutAvatarInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutAvatarInput | UserUpsertWithWhereUniqueWithoutAvatarInput[]
    createMany?: UserCreateManyAvatarInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutAvatarInput | UserUpdateWithWhereUniqueWithoutAvatarInput[]
    updateMany?: UserUpdateManyWithWhereWithoutAvatarInput | UserUpdateManyWithWhereWithoutAvatarInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type SpaceCreateWithoutCreatorInput = {
    id?: string
    name: string
    width: number
    height?: number | null
    thumbnail?: string | null
    elements?: spaceElementsCreateNestedManyWithoutSpaceInput
  }

  export type SpaceUncheckedCreateWithoutCreatorInput = {
    id?: string
    name: string
    width: number
    height?: number | null
    thumbnail?: string | null
    elements?: spaceElementsUncheckedCreateNestedManyWithoutSpaceInput
  }

  export type SpaceCreateOrConnectWithoutCreatorInput = {
    where: SpaceWhereUniqueInput
    create: XOR<SpaceCreateWithoutCreatorInput, SpaceUncheckedCreateWithoutCreatorInput>
  }

  export type SpaceCreateManyCreatorInputEnvelope = {
    data: SpaceCreateManyCreatorInput | SpaceCreateManyCreatorInput[]
    skipDuplicates?: boolean
  }

  export type AvatarCreateWithoutUsersInput = {
    id?: string
    imageUrl?: string | null
    name?: string | null
  }

  export type AvatarUncheckedCreateWithoutUsersInput = {
    id?: string
    imageUrl?: string | null
    name?: string | null
  }

  export type AvatarCreateOrConnectWithoutUsersInput = {
    where: AvatarWhereUniqueInput
    create: XOR<AvatarCreateWithoutUsersInput, AvatarUncheckedCreateWithoutUsersInput>
  }

  export type SpaceUpsertWithWhereUniqueWithoutCreatorInput = {
    where: SpaceWhereUniqueInput
    update: XOR<SpaceUpdateWithoutCreatorInput, SpaceUncheckedUpdateWithoutCreatorInput>
    create: XOR<SpaceCreateWithoutCreatorInput, SpaceUncheckedCreateWithoutCreatorInput>
  }

  export type SpaceUpdateWithWhereUniqueWithoutCreatorInput = {
    where: SpaceWhereUniqueInput
    data: XOR<SpaceUpdateWithoutCreatorInput, SpaceUncheckedUpdateWithoutCreatorInput>
  }

  export type SpaceUpdateManyWithWhereWithoutCreatorInput = {
    where: SpaceScalarWhereInput
    data: XOR<SpaceUpdateManyMutationInput, SpaceUncheckedUpdateManyWithoutCreatorInput>
  }

  export type SpaceScalarWhereInput = {
    AND?: SpaceScalarWhereInput | SpaceScalarWhereInput[]
    OR?: SpaceScalarWhereInput[]
    NOT?: SpaceScalarWhereInput | SpaceScalarWhereInput[]
    id?: StringFilter<"Space"> | string
    name?: StringFilter<"Space"> | string
    width?: IntFilter<"Space"> | number
    height?: IntNullableFilter<"Space"> | number | null
    thumbnail?: StringNullableFilter<"Space"> | string | null
    creatorId?: StringFilter<"Space"> | string
  }

  export type AvatarUpsertWithoutUsersInput = {
    update: XOR<AvatarUpdateWithoutUsersInput, AvatarUncheckedUpdateWithoutUsersInput>
    create: XOR<AvatarCreateWithoutUsersInput, AvatarUncheckedCreateWithoutUsersInput>
    where?: AvatarWhereInput
  }

  export type AvatarUpdateToOneWithWhereWithoutUsersInput = {
    where?: AvatarWhereInput
    data: XOR<AvatarUpdateWithoutUsersInput, AvatarUncheckedUpdateWithoutUsersInput>
  }

  export type AvatarUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AvatarUncheckedUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserCreateWithoutSpaceInput = {
    id?: string
    username: string
    password: string
    role: $Enums.Role
    avatar: AvatarCreateNestedOneWithoutUsersInput
  }

  export type UserUncheckedCreateWithoutSpaceInput = {
    id?: string
    username: string
    password: string
    avatarId: string
    role: $Enums.Role
  }

  export type UserCreateOrConnectWithoutSpaceInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSpaceInput, UserUncheckedCreateWithoutSpaceInput>
  }

  export type spaceElementsCreateWithoutSpaceInput = {
    id?: string
    x: number
    y: number
    element: ElementCreateNestedOneWithoutSpacesInput
  }

  export type spaceElementsUncheckedCreateWithoutSpaceInput = {
    id?: string
    elementId: string
    x: number
    y: number
  }

  export type spaceElementsCreateOrConnectWithoutSpaceInput = {
    where: spaceElementsWhereUniqueInput
    create: XOR<spaceElementsCreateWithoutSpaceInput, spaceElementsUncheckedCreateWithoutSpaceInput>
  }

  export type spaceElementsCreateManySpaceInputEnvelope = {
    data: spaceElementsCreateManySpaceInput | spaceElementsCreateManySpaceInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutSpaceInput = {
    update: XOR<UserUpdateWithoutSpaceInput, UserUncheckedUpdateWithoutSpaceInput>
    create: XOR<UserCreateWithoutSpaceInput, UserUncheckedCreateWithoutSpaceInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSpaceInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSpaceInput, UserUncheckedUpdateWithoutSpaceInput>
  }

  export type UserUpdateWithoutSpaceInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    avatar?: AvatarUpdateOneRequiredWithoutUsersNestedInput
  }

  export type UserUncheckedUpdateWithoutSpaceInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    avatarId?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
  }

  export type spaceElementsUpsertWithWhereUniqueWithoutSpaceInput = {
    where: spaceElementsWhereUniqueInput
    update: XOR<spaceElementsUpdateWithoutSpaceInput, spaceElementsUncheckedUpdateWithoutSpaceInput>
    create: XOR<spaceElementsCreateWithoutSpaceInput, spaceElementsUncheckedCreateWithoutSpaceInput>
  }

  export type spaceElementsUpdateWithWhereUniqueWithoutSpaceInput = {
    where: spaceElementsWhereUniqueInput
    data: XOR<spaceElementsUpdateWithoutSpaceInput, spaceElementsUncheckedUpdateWithoutSpaceInput>
  }

  export type spaceElementsUpdateManyWithWhereWithoutSpaceInput = {
    where: spaceElementsScalarWhereInput
    data: XOR<spaceElementsUpdateManyMutationInput, spaceElementsUncheckedUpdateManyWithoutSpaceInput>
  }

  export type spaceElementsScalarWhereInput = {
    AND?: spaceElementsScalarWhereInput | spaceElementsScalarWhereInput[]
    OR?: spaceElementsScalarWhereInput[]
    NOT?: spaceElementsScalarWhereInput | spaceElementsScalarWhereInput[]
    id?: StringFilter<"spaceElements"> | string
    elementId?: StringFilter<"spaceElements"> | string
    spaceId?: StringFilter<"spaceElements"> | string
    x?: IntFilter<"spaceElements"> | number
    y?: IntFilter<"spaceElements"> | number
  }

  export type SpaceCreateWithoutElementsInput = {
    id?: string
    name: string
    width: number
    height?: number | null
    thumbnail?: string | null
    creator: UserCreateNestedOneWithoutSpaceInput
  }

  export type SpaceUncheckedCreateWithoutElementsInput = {
    id?: string
    name: string
    width: number
    height?: number | null
    thumbnail?: string | null
    creatorId: string
  }

  export type SpaceCreateOrConnectWithoutElementsInput = {
    where: SpaceWhereUniqueInput
    create: XOR<SpaceCreateWithoutElementsInput, SpaceUncheckedCreateWithoutElementsInput>
  }

  export type ElementCreateWithoutSpacesInput = {
    id?: string
    width: number
    height: number
    imageUrl: string
    mapElements?: MapElementsCreateNestedManyWithoutElementInput
  }

  export type ElementUncheckedCreateWithoutSpacesInput = {
    id?: string
    width: number
    height: number
    imageUrl: string
    mapElements?: MapElementsUncheckedCreateNestedManyWithoutElementInput
  }

  export type ElementCreateOrConnectWithoutSpacesInput = {
    where: ElementWhereUniqueInput
    create: XOR<ElementCreateWithoutSpacesInput, ElementUncheckedCreateWithoutSpacesInput>
  }

  export type SpaceUpsertWithoutElementsInput = {
    update: XOR<SpaceUpdateWithoutElementsInput, SpaceUncheckedUpdateWithoutElementsInput>
    create: XOR<SpaceCreateWithoutElementsInput, SpaceUncheckedCreateWithoutElementsInput>
    where?: SpaceWhereInput
  }

  export type SpaceUpdateToOneWithWhereWithoutElementsInput = {
    where?: SpaceWhereInput
    data: XOR<SpaceUpdateWithoutElementsInput, SpaceUncheckedUpdateWithoutElementsInput>
  }

  export type SpaceUpdateWithoutElementsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    width?: IntFieldUpdateOperationsInput | number
    height?: NullableIntFieldUpdateOperationsInput | number | null
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    creator?: UserUpdateOneRequiredWithoutSpaceNestedInput
  }

  export type SpaceUncheckedUpdateWithoutElementsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    width?: IntFieldUpdateOperationsInput | number
    height?: NullableIntFieldUpdateOperationsInput | number | null
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    creatorId?: StringFieldUpdateOperationsInput | string
  }

  export type ElementUpsertWithoutSpacesInput = {
    update: XOR<ElementUpdateWithoutSpacesInput, ElementUncheckedUpdateWithoutSpacesInput>
    create: XOR<ElementCreateWithoutSpacesInput, ElementUncheckedCreateWithoutSpacesInput>
    where?: ElementWhereInput
  }

  export type ElementUpdateToOneWithWhereWithoutSpacesInput = {
    where?: ElementWhereInput
    data: XOR<ElementUpdateWithoutSpacesInput, ElementUncheckedUpdateWithoutSpacesInput>
  }

  export type ElementUpdateWithoutSpacesInput = {
    id?: StringFieldUpdateOperationsInput | string
    width?: IntFieldUpdateOperationsInput | number
    height?: IntFieldUpdateOperationsInput | number
    imageUrl?: StringFieldUpdateOperationsInput | string
    mapElements?: MapElementsUpdateManyWithoutElementNestedInput
  }

  export type ElementUncheckedUpdateWithoutSpacesInput = {
    id?: StringFieldUpdateOperationsInput | string
    width?: IntFieldUpdateOperationsInput | number
    height?: IntFieldUpdateOperationsInput | number
    imageUrl?: StringFieldUpdateOperationsInput | string
    mapElements?: MapElementsUncheckedUpdateManyWithoutElementNestedInput
  }

  export type spaceElementsCreateWithoutElementInput = {
    id?: string
    x: number
    y: number
    space: SpaceCreateNestedOneWithoutElementsInput
  }

  export type spaceElementsUncheckedCreateWithoutElementInput = {
    id?: string
    spaceId: string
    x: number
    y: number
  }

  export type spaceElementsCreateOrConnectWithoutElementInput = {
    where: spaceElementsWhereUniqueInput
    create: XOR<spaceElementsCreateWithoutElementInput, spaceElementsUncheckedCreateWithoutElementInput>
  }

  export type spaceElementsCreateManyElementInputEnvelope = {
    data: spaceElementsCreateManyElementInput | spaceElementsCreateManyElementInput[]
    skipDuplicates?: boolean
  }

  export type MapElementsCreateWithoutElementInput = {
    id?: string
    x?: number | null
    y?: number | null
    map: MapCreateNestedOneWithoutMapElementsInput
  }

  export type MapElementsUncheckedCreateWithoutElementInput = {
    id?: string
    mapId: string
    x?: number | null
    y?: number | null
  }

  export type MapElementsCreateOrConnectWithoutElementInput = {
    where: MapElementsWhereUniqueInput
    create: XOR<MapElementsCreateWithoutElementInput, MapElementsUncheckedCreateWithoutElementInput>
  }

  export type MapElementsCreateManyElementInputEnvelope = {
    data: MapElementsCreateManyElementInput | MapElementsCreateManyElementInput[]
    skipDuplicates?: boolean
  }

  export type spaceElementsUpsertWithWhereUniqueWithoutElementInput = {
    where: spaceElementsWhereUniqueInput
    update: XOR<spaceElementsUpdateWithoutElementInput, spaceElementsUncheckedUpdateWithoutElementInput>
    create: XOR<spaceElementsCreateWithoutElementInput, spaceElementsUncheckedCreateWithoutElementInput>
  }

  export type spaceElementsUpdateWithWhereUniqueWithoutElementInput = {
    where: spaceElementsWhereUniqueInput
    data: XOR<spaceElementsUpdateWithoutElementInput, spaceElementsUncheckedUpdateWithoutElementInput>
  }

  export type spaceElementsUpdateManyWithWhereWithoutElementInput = {
    where: spaceElementsScalarWhereInput
    data: XOR<spaceElementsUpdateManyMutationInput, spaceElementsUncheckedUpdateManyWithoutElementInput>
  }

  export type MapElementsUpsertWithWhereUniqueWithoutElementInput = {
    where: MapElementsWhereUniqueInput
    update: XOR<MapElementsUpdateWithoutElementInput, MapElementsUncheckedUpdateWithoutElementInput>
    create: XOR<MapElementsCreateWithoutElementInput, MapElementsUncheckedCreateWithoutElementInput>
  }

  export type MapElementsUpdateWithWhereUniqueWithoutElementInput = {
    where: MapElementsWhereUniqueInput
    data: XOR<MapElementsUpdateWithoutElementInput, MapElementsUncheckedUpdateWithoutElementInput>
  }

  export type MapElementsUpdateManyWithWhereWithoutElementInput = {
    where: MapElementsScalarWhereInput
    data: XOR<MapElementsUpdateManyMutationInput, MapElementsUncheckedUpdateManyWithoutElementInput>
  }

  export type MapElementsScalarWhereInput = {
    AND?: MapElementsScalarWhereInput | MapElementsScalarWhereInput[]
    OR?: MapElementsScalarWhereInput[]
    NOT?: MapElementsScalarWhereInput | MapElementsScalarWhereInput[]
    id?: StringFilter<"MapElements"> | string
    mapId?: StringFilter<"MapElements"> | string
    elementId?: StringFilter<"MapElements"> | string
    x?: IntNullableFilter<"MapElements"> | number | null
    y?: IntNullableFilter<"MapElements"> | number | null
  }

  export type MapElementsCreateWithoutMapInput = {
    id?: string
    x?: number | null
    y?: number | null
    element: ElementCreateNestedOneWithoutMapElementsInput
  }

  export type MapElementsUncheckedCreateWithoutMapInput = {
    id?: string
    elementId: string
    x?: number | null
    y?: number | null
  }

  export type MapElementsCreateOrConnectWithoutMapInput = {
    where: MapElementsWhereUniqueInput
    create: XOR<MapElementsCreateWithoutMapInput, MapElementsUncheckedCreateWithoutMapInput>
  }

  export type MapElementsCreateManyMapInputEnvelope = {
    data: MapElementsCreateManyMapInput | MapElementsCreateManyMapInput[]
    skipDuplicates?: boolean
  }

  export type MapElementsUpsertWithWhereUniqueWithoutMapInput = {
    where: MapElementsWhereUniqueInput
    update: XOR<MapElementsUpdateWithoutMapInput, MapElementsUncheckedUpdateWithoutMapInput>
    create: XOR<MapElementsCreateWithoutMapInput, MapElementsUncheckedCreateWithoutMapInput>
  }

  export type MapElementsUpdateWithWhereUniqueWithoutMapInput = {
    where: MapElementsWhereUniqueInput
    data: XOR<MapElementsUpdateWithoutMapInput, MapElementsUncheckedUpdateWithoutMapInput>
  }

  export type MapElementsUpdateManyWithWhereWithoutMapInput = {
    where: MapElementsScalarWhereInput
    data: XOR<MapElementsUpdateManyMutationInput, MapElementsUncheckedUpdateManyWithoutMapInput>
  }

  export type MapCreateWithoutMapElementsInput = {
    id?: string
    width: number
    height: number
    name: string
  }

  export type MapUncheckedCreateWithoutMapElementsInput = {
    id?: string
    width: number
    height: number
    name: string
  }

  export type MapCreateOrConnectWithoutMapElementsInput = {
    where: MapWhereUniqueInput
    create: XOR<MapCreateWithoutMapElementsInput, MapUncheckedCreateWithoutMapElementsInput>
  }

  export type ElementCreateWithoutMapElementsInput = {
    id?: string
    width: number
    height: number
    imageUrl: string
    spaces?: spaceElementsCreateNestedManyWithoutElementInput
  }

  export type ElementUncheckedCreateWithoutMapElementsInput = {
    id?: string
    width: number
    height: number
    imageUrl: string
    spaces?: spaceElementsUncheckedCreateNestedManyWithoutElementInput
  }

  export type ElementCreateOrConnectWithoutMapElementsInput = {
    where: ElementWhereUniqueInput
    create: XOR<ElementCreateWithoutMapElementsInput, ElementUncheckedCreateWithoutMapElementsInput>
  }

  export type MapUpsertWithoutMapElementsInput = {
    update: XOR<MapUpdateWithoutMapElementsInput, MapUncheckedUpdateWithoutMapElementsInput>
    create: XOR<MapCreateWithoutMapElementsInput, MapUncheckedCreateWithoutMapElementsInput>
    where?: MapWhereInput
  }

  export type MapUpdateToOneWithWhereWithoutMapElementsInput = {
    where?: MapWhereInput
    data: XOR<MapUpdateWithoutMapElementsInput, MapUncheckedUpdateWithoutMapElementsInput>
  }

  export type MapUpdateWithoutMapElementsInput = {
    id?: StringFieldUpdateOperationsInput | string
    width?: IntFieldUpdateOperationsInput | number
    height?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
  }

  export type MapUncheckedUpdateWithoutMapElementsInput = {
    id?: StringFieldUpdateOperationsInput | string
    width?: IntFieldUpdateOperationsInput | number
    height?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
  }

  export type ElementUpsertWithoutMapElementsInput = {
    update: XOR<ElementUpdateWithoutMapElementsInput, ElementUncheckedUpdateWithoutMapElementsInput>
    create: XOR<ElementCreateWithoutMapElementsInput, ElementUncheckedCreateWithoutMapElementsInput>
    where?: ElementWhereInput
  }

  export type ElementUpdateToOneWithWhereWithoutMapElementsInput = {
    where?: ElementWhereInput
    data: XOR<ElementUpdateWithoutMapElementsInput, ElementUncheckedUpdateWithoutMapElementsInput>
  }

  export type ElementUpdateWithoutMapElementsInput = {
    id?: StringFieldUpdateOperationsInput | string
    width?: IntFieldUpdateOperationsInput | number
    height?: IntFieldUpdateOperationsInput | number
    imageUrl?: StringFieldUpdateOperationsInput | string
    spaces?: spaceElementsUpdateManyWithoutElementNestedInput
  }

  export type ElementUncheckedUpdateWithoutMapElementsInput = {
    id?: StringFieldUpdateOperationsInput | string
    width?: IntFieldUpdateOperationsInput | number
    height?: IntFieldUpdateOperationsInput | number
    imageUrl?: StringFieldUpdateOperationsInput | string
    spaces?: spaceElementsUncheckedUpdateManyWithoutElementNestedInput
  }

  export type UserCreateWithoutAvatarInput = {
    id?: string
    username: string
    password: string
    role: $Enums.Role
    Space?: SpaceCreateNestedManyWithoutCreatorInput
  }

  export type UserUncheckedCreateWithoutAvatarInput = {
    id?: string
    username: string
    password: string
    role: $Enums.Role
    Space?: SpaceUncheckedCreateNestedManyWithoutCreatorInput
  }

  export type UserCreateOrConnectWithoutAvatarInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAvatarInput, UserUncheckedCreateWithoutAvatarInput>
  }

  export type UserCreateManyAvatarInputEnvelope = {
    data: UserCreateManyAvatarInput | UserCreateManyAvatarInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithWhereUniqueWithoutAvatarInput = {
    where: UserWhereUniqueInput
    update: XOR<UserUpdateWithoutAvatarInput, UserUncheckedUpdateWithoutAvatarInput>
    create: XOR<UserCreateWithoutAvatarInput, UserUncheckedCreateWithoutAvatarInput>
  }

  export type UserUpdateWithWhereUniqueWithoutAvatarInput = {
    where: UserWhereUniqueInput
    data: XOR<UserUpdateWithoutAvatarInput, UserUncheckedUpdateWithoutAvatarInput>
  }

  export type UserUpdateManyWithWhereWithoutAvatarInput = {
    where: UserScalarWhereInput
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyWithoutAvatarInput>
  }

  export type UserScalarWhereInput = {
    AND?: UserScalarWhereInput | UserScalarWhereInput[]
    OR?: UserScalarWhereInput[]
    NOT?: UserScalarWhereInput | UserScalarWhereInput[]
    id?: StringFilter<"User"> | string
    username?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    avatarId?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
  }

  export type SpaceCreateManyCreatorInput = {
    id?: string
    name: string
    width: number
    height?: number | null
    thumbnail?: string | null
  }

  export type SpaceUpdateWithoutCreatorInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    width?: IntFieldUpdateOperationsInput | number
    height?: NullableIntFieldUpdateOperationsInput | number | null
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    elements?: spaceElementsUpdateManyWithoutSpaceNestedInput
  }

  export type SpaceUncheckedUpdateWithoutCreatorInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    width?: IntFieldUpdateOperationsInput | number
    height?: NullableIntFieldUpdateOperationsInput | number | null
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    elements?: spaceElementsUncheckedUpdateManyWithoutSpaceNestedInput
  }

  export type SpaceUncheckedUpdateManyWithoutCreatorInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    width?: IntFieldUpdateOperationsInput | number
    height?: NullableIntFieldUpdateOperationsInput | number | null
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type spaceElementsCreateManySpaceInput = {
    id?: string
    elementId: string
    x: number
    y: number
  }

  export type spaceElementsUpdateWithoutSpaceInput = {
    id?: StringFieldUpdateOperationsInput | string
    x?: IntFieldUpdateOperationsInput | number
    y?: IntFieldUpdateOperationsInput | number
    element?: ElementUpdateOneRequiredWithoutSpacesNestedInput
  }

  export type spaceElementsUncheckedUpdateWithoutSpaceInput = {
    id?: StringFieldUpdateOperationsInput | string
    elementId?: StringFieldUpdateOperationsInput | string
    x?: IntFieldUpdateOperationsInput | number
    y?: IntFieldUpdateOperationsInput | number
  }

  export type spaceElementsUncheckedUpdateManyWithoutSpaceInput = {
    id?: StringFieldUpdateOperationsInput | string
    elementId?: StringFieldUpdateOperationsInput | string
    x?: IntFieldUpdateOperationsInput | number
    y?: IntFieldUpdateOperationsInput | number
  }

  export type spaceElementsCreateManyElementInput = {
    id?: string
    spaceId: string
    x: number
    y: number
  }

  export type MapElementsCreateManyElementInput = {
    id?: string
    mapId: string
    x?: number | null
    y?: number | null
  }

  export type spaceElementsUpdateWithoutElementInput = {
    id?: StringFieldUpdateOperationsInput | string
    x?: IntFieldUpdateOperationsInput | number
    y?: IntFieldUpdateOperationsInput | number
    space?: SpaceUpdateOneRequiredWithoutElementsNestedInput
  }

  export type spaceElementsUncheckedUpdateWithoutElementInput = {
    id?: StringFieldUpdateOperationsInput | string
    spaceId?: StringFieldUpdateOperationsInput | string
    x?: IntFieldUpdateOperationsInput | number
    y?: IntFieldUpdateOperationsInput | number
  }

  export type spaceElementsUncheckedUpdateManyWithoutElementInput = {
    id?: StringFieldUpdateOperationsInput | string
    spaceId?: StringFieldUpdateOperationsInput | string
    x?: IntFieldUpdateOperationsInput | number
    y?: IntFieldUpdateOperationsInput | number
  }

  export type MapElementsUpdateWithoutElementInput = {
    id?: StringFieldUpdateOperationsInput | string
    x?: NullableIntFieldUpdateOperationsInput | number | null
    y?: NullableIntFieldUpdateOperationsInput | number | null
    map?: MapUpdateOneRequiredWithoutMapElementsNestedInput
  }

  export type MapElementsUncheckedUpdateWithoutElementInput = {
    id?: StringFieldUpdateOperationsInput | string
    mapId?: StringFieldUpdateOperationsInput | string
    x?: NullableIntFieldUpdateOperationsInput | number | null
    y?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type MapElementsUncheckedUpdateManyWithoutElementInput = {
    id?: StringFieldUpdateOperationsInput | string
    mapId?: StringFieldUpdateOperationsInput | string
    x?: NullableIntFieldUpdateOperationsInput | number | null
    y?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type MapElementsCreateManyMapInput = {
    id?: string
    elementId: string
    x?: number | null
    y?: number | null
  }

  export type MapElementsUpdateWithoutMapInput = {
    id?: StringFieldUpdateOperationsInput | string
    x?: NullableIntFieldUpdateOperationsInput | number | null
    y?: NullableIntFieldUpdateOperationsInput | number | null
    element?: ElementUpdateOneRequiredWithoutMapElementsNestedInput
  }

  export type MapElementsUncheckedUpdateWithoutMapInput = {
    id?: StringFieldUpdateOperationsInput | string
    elementId?: StringFieldUpdateOperationsInput | string
    x?: NullableIntFieldUpdateOperationsInput | number | null
    y?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type MapElementsUncheckedUpdateManyWithoutMapInput = {
    id?: StringFieldUpdateOperationsInput | string
    elementId?: StringFieldUpdateOperationsInput | string
    x?: NullableIntFieldUpdateOperationsInput | number | null
    y?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type UserCreateManyAvatarInput = {
    id?: string
    username: string
    password: string
    role: $Enums.Role
  }

  export type UserUpdateWithoutAvatarInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    Space?: SpaceUpdateManyWithoutCreatorNestedInput
  }

  export type UserUncheckedUpdateWithoutAvatarInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    Space?: SpaceUncheckedUpdateManyWithoutCreatorNestedInput
  }

  export type UserUncheckedUpdateManyWithoutAvatarInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}