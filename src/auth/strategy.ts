import passport from "passport";
import {
  Strategy as JwtStrategy,
  ExtractJwt,
  StrategyOptions,
} from "passport-jwt";
import { AppDataSource } from "../dataSource";
import { User } from "../entities/User";
import { JWT_SECRET } from "../constants";

const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET,
};

// Credentials Verification
passport.use(
  new JwtStrategy(options, async (jwt_payload, done) => {
    try {
      const user = await AppDataSource.getRepository(User).findOneByOrFail({
        id: jwt_payload.id,
      });
      done(null, user);
    } catch (e) {
      console.error(e);
      done(e, false, { message: "Invalid Token" });
    }
  })
);
