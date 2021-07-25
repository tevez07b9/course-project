import { Resolver, Mutation, Arg, Field, InputType, Query } from "type-graphql";
import { Course } from "../entities/Course";

@InputType()
export class CourseInput {
  @Field()
  title: string;
  @Field()
  thumbnailURL: string;
  @Field()
  price: number;
  @Field(() => [String])
  videoLink: string[];
}

@Resolver(Course)
export class CourseResolver {
  @Mutation(() => Course, { nullable: true })
  async createCourse(
    @Arg("options") options: CourseInput
  ): Promise<Course | undefined> {
    return Course.create({
      title: options.title,
      thumbnailURL: options.thumbnailURL,
      pirce: options.price,
      videoLink: options.videoLink,
    }).save();
  }

  @Query(() => [Course], { nullable: true })
  async listCourse(): Promise<Course[] | undefined> {
    return Course.find({});
  }
}
