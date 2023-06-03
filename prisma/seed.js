const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const users = [
    {
        username: 'rakuma',
        name: 'Rahman',
        email: 'rakuma@gmail.com',
        password: '123'
        // registeredAt: ,
        // updatedAt: new Date().toJSON,
        
    },
    {
        username: 'test',
        name: 'TestName',
        email: 'test@gmail.com',
        password: '321'
    }
]

async function main(){
    for(let user of users){
        await prisma.user.create({
            data: user
        })
    }
}

main().catch(e => {
    console.log(e);
    process.exit(1);
}).finally(() => {
    prisma.$disconnect;
})