import { Purchase } from "../entities/Purchase";
import { User } from "../entities/User";
import { Resolver, Mutation, Arg, Field, InputType, Ctx } from "type-graphql";
import { Course } from "../entities/Course";
import { MyContext } from "src/types";

@InputType()
export class PurchaseInput {
  @Field()
  courseID: number;
  @Field()
  creditCard: string;
}

@Resolver(Purchase)
export class PurchaseResolver {
  @Mutation(() => Purchase, { nullable: true })
  async purchase(
    @Arg("options") options: PurchaseInput,
    @Ctx() { req }: MyContext
  ): Promise<Purchase | undefined> {
    const course = await Course.findOne(options.courseID);
    if (!course) {
      return;
    }
    if (!req.session.userID) {
      return;
    }

    const userID = req.session.userID;

    const user = await User.findOne(userID);
    if (!user) {
      return;
    }

    return Purchase.create({
      userID: userID,
      courseID: options.courseID,
      credicard: options.creditCard,
      paymetstatus: "success",
      course,
      user,
    }).save();
  }
}
