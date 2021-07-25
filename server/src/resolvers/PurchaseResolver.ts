import { Purchase } from "../entities/Purchase";
import { User } from "../entities/User";
import { Resolver, Mutation, Arg, Field, InputType } from "type-graphql";
import { Course } from "../entities/Course";

@InputType()
export class PurchaseInput {
  @Field()
  courseID: number;
  @Field()
  userID: number;
  @Field()
  creditCard: string;
}

@Resolver(Purchase)
export class PurchaseResolver {
  @Mutation(() => Purchase, { nullable: true })
  async purchase(
    @Arg("options") options: PurchaseInput
  ): Promise<Purchase | undefined> {
    const course = await Course.findOne(options.courseID);
    if (!course) {
      return;
    }

    const userID = options.userID;

    const user = await User.findOne(userID);
    if (!user) {
      return;
    }

    return Purchase.create({
      userID: options.userID,
      courseID: options.courseID,
      credicard: options.creditCard,
      paymetstatus: "success",
      course,
      user,
    }).save();
  }
}
