/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');

const destination = process.cwd() + '/src/models/';

const arg = process.argv.slice(2);

function createModelFile(name) {
  try {
    const lower = name.toString().toLowerCase();
    console.log('creating file in ' + destination);
    fs.writeFileSync(
      destination + lower + '.model.ts',
      `import {Column, Model, Table, PrimaryKey, UpdatedAt, CreatedAt} from 'sequelize-typescript';
  
  @Table
  export class ${name} extends Model<${name}> {
    @PrimaryKey
    @Column
    ${lower}Id: number;
  
    @Column
    OtherFileds;
  
    @CreatedAt
    createdAt: Date;
    @UpdatedAt
    updatedAt: Date;
  }
  `,
    );

    console.log('===============================');
    console.log('File created ' + name + '.ts');
  } catch (error) {
    console.log(error);
  }
}
createModelFile(arg);
