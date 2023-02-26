import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, CreateDateColumn, BeforeInsert } from 'typeorm';
import { TagEntity } from './tag.entity';
import { v4 as uuidv4 } from 'uuid';

@Entity('course')
export class CourseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column()
    name: string;
  
    @Column()
    description: string;
  
    @JoinTable({ name: 'courses_tags' })
    @ManyToMany(() => TagEntity, (tag) => tag.courses, {
      cascade: true,
    })
    tags: TagEntity[];
  
    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;
  
    @BeforeInsert()
    generatedId() {
      if (this.id) {
        return;
      }
  
      this.id = uuidv4();
    }
}
