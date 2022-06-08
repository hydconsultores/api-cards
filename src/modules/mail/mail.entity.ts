import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Mail {
    @PrimaryGeneratedColumn({
        type: 'integer',
        name: 'id',
      })
      id: number;
}