import { ObjectType, Field } from "type-graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  BaseEntity,
  OneToMany,
} from "typeorm";
import { Purchase } from "./Purchase";

@ObjectType()
@Entity()
export class Course extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ unique: true })
  title: string;

  @Field()
  @Column()
  thumbnailURL: string;

  @Field()
  @Column()
  pirce: number;

  @Field(() => [String])
  @Column("text", { array: true })
  videoLink: string[];

  @Field(() => [Purchase], { nullable: true })
  @OneToMany(() => Purchase, (purchase) => purchase.course)
  purchases: Purchase[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
