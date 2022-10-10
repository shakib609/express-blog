import { Column, Entity, ManyToMany, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { Comment } from "./Comment";
import { Tag } from "./Tag";
import { User } from "./User";

@Entity()
export class Post extends BaseEntity {
  @Column()
  title: string;

  @Column({ type: "text" })
  body: string;

  @ManyToOne(() => User, (user) => user.posts, { onDelete: "CASCADE" })
  author: User;

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment;

  @ManyToMany(() => Tag, (tag) => tag.posts)
  tags: Tag[];
}
