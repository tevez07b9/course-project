import { ObjectType, Field } from "type-graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  BaseEntity,
  ManyToOne,
} from "typeorm";
import { Course } from "./Course";
import { User } from "./User";

@ObjectType()
@Entity()
export class Purchase extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  userID: number;

  @Field()
  @Column()
  courseID: number;

  @Field()
  @Column()
  credicard: string;

  @Field()
  @Column()
  paymetstatus: string;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.purchases)
  user: User;

  @Field(() => Course)
  @ManyToOne(() => Course, (course) => course.purchases)
  course: Course;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
