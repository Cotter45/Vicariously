'use strict';

const faker = require('faker');
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('Users', [
     { username: 'demo', email: 'demo@demo.com', hashedPassword: bcrypt.hashSync('password'), birthday: '01-01-1980', profilePicture: 'https://thumbs.dreamstime.com/b/demo-seal-watermark-distress-texture-red-vector-rubber-print-demo-text-dust-texture-text-tag-placed-double-135335018.jpg', description: 'I am a demo user for anyone testing out this sites functionality!', online: false },
     { username: 'spuds', email: 'spuds@demo.com', hashedPassword: bcrypt.hashSync('password'), birthday: '02-02-1980', profilePicture: 'https://thumbs.dreamstime.com/b/demo-seal-watermark-distress-texture-red-vector-rubber-print-demo-text-dust-texture-text-tag-placed-double-135335018.jpg', description: 'I am a demo user for anyone testing out this sites functionality!', online: false },
     { username: 'Spudsauz', email: 'spudsauz@demo.com', hashedPassword: bcrypt.hashSync('password'), birthday: '02-02-1980', profilePicture: 'https://www.biography.com/.image/ar_8:10%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cg_faces:center%2Cq_auto:good%2Cw_620/MTgwMjk3NTA4MTYzOTU0NTQw/gettyimages-1078129184.jpg', description: 'I am a demo user for anyone testing out this sites functionality!', online: false },
     { username: 'Wifey', email: 'wifey@demo.com', hashedPassword: bcrypt.hashSync('password'), birthday: '02-02-1980', profilePicture: 'https://s.abcnews.com/images/GMA/201202_gma_kosar1_hpMain_16x9_992.jpg', description: 'I am a demo user for anyone testing out this sites functionality!', online: false },
     { username: 'Karen', email: 'karen@demo.com', hashedPassword: bcrypt.hashSync('password'), birthday: '02-02-1980', profilePicture: 'https://cbsnews1.cbsistatic.com/hub/i/2018/11/06/0c1af1b8-155a-458e-b105-78f1e7344bf4/2018-11-06t054310z-1334124005-rc1be15a8050-rtrmadp-3-people-sexiest-man.jpg', description: 'I am a demo user for anyone testing out this sites functionality!', online: false },
     { username: 'Steve', email: 'steve@demo.com', hashedPassword: bcrypt.hashSync('password'), birthday: '02-02-1980', profilePicture: 'https://www.tubefilter.com/wp-content/uploads/2019/11/dobrik-people.jpg', description: 'I am a demo user for anyone testing out this sites functionality!', online: false },
     { username: 'Bob', email: 'bob@demo.com', hashedPassword: bcrypt.hashSync('password'), birthday: '02-02-1980', profilePicture: 'https://media-cldnry.s-nbcnews.com/image/upload/t_fit-760w,f_auto,q_auto:best/newscms/2020_47/3429313/201118-michael-b-jordan-se-106p.jpg', description: 'I am a demo user for anyone testing out this sites functionality!', online: false },
     { username: 'Dad5000', email: 'dad@demo.com', hashedPassword: bcrypt.hashSync('password'), birthday: '02-02-1980', profilePicture: 'https://thumbs-prod.si-cdn.com/2JSBZ4E6nfvV70vvM-WFTmGc9v0=/800x600/filters:no_upscale():focal(1797x1485:1798x1486)/https://public-media.si-cdn.com/filer/39/72/39729182-242b-41f3-a74c-cd653e0ec315/k824tg.jpg', description: 'I am a demo user for anyone testing out this sites functionality!', online: false },
     { username: 'Goku', email: 'goku@demo.com', hashedPassword: bcrypt.hashSync('password'), birthday: '02-02-1980', profilePicture: 'https://variety.com/wp-content/uploads/2021/05/MORRIS_CHESTNUT-e1621262142971.jpg?w=681&h=383&crop=1', description: 'I am a demo user for anyone testing out this sites functionality!', online: false },
     { username: 'Emily', email: 'emily@demo.com', hashedPassword: bcrypt.hashSync('password'), birthday: '02-02-1980', profilePicture: 'https://api.time.com/wp-content/uploads/2014/05/166259035.jpg?w=824&quality=70', description: 'I am a demo user for anyone testing out this sites functionality!', online: false },
     { username: 'Liam', email: 'liam@demo.com', hashedPassword: bcrypt.hashSync('password'), birthday: '02-02-1980', profilePicture: 'https://images.theconversation.com/files/394082/original/file-20210408-17-iunr2y.jpg?ixlib=rb-1.1.0&rect=3%2C6%2C2114%2C1403&q=45&auto=format&w=926&fit=clip', description: 'I am a demo user for anyone testing out this sites functionality!', online: false },
     { username: 'Shelby', email: 'shelby@demo.com', hashedPassword: bcrypt.hashSync('password'), birthday: '02-02-1980', profilePicture: 'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F20%2F2021%2F07%2F24%2FCarson-Boatman.jpg', description: 'I am a demo user for anyone testing out this sites functionality!', online: false },
     { username: 'Alex', email: 'alex@demo.com', hashedPassword: bcrypt.hashSync('password'), birthday: '02-02-1980', profilePicture: 'https://www.statnews.com/wp-content/uploads/2021/01/image0.jpeg', description: 'I am a demo user for anyone testing out this sites functionality!', online: false },
     { username: 'Laura', email: 'laura@demo.com', hashedPassword: bcrypt.hashSync('password'), birthday: '02-02-1980', profilePicture: 'https://www.tampabay.com/resizer/_NX0W08JY9BCxcO8aWSyleJKKNY=/1600x900/smart/cloudfront-us-east-1.images.arcpublishing.com/tbt/SYEHICTK45ADDGJKC36PZRNMT4.jpg', description: 'I am a demo user for anyone testing out this sites functionality!', online: false },
     { username: 'Bash', email: 'bash@demo.com', hashedPassword: bcrypt.hashSync('password'), birthday: '02-02-1980', profilePicture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtpz-sTSvdkhEixDgpQqQas_cl1wnhrRokOw&usqp=CAU', description: 'I am a demo user for anyone testing out this sites functionality!', online: false },
     { username: 'Hunter', email: 'hunter@demo.com', hashedPassword: bcrypt.hashSync('password'), birthday: '02-02-1980', profilePicture: 'https://www.helpguide.org/wp-content/uploads/young-woman-burka-smiles-at-companion-768.jpg', description: 'I am a demo user for anyone testing out this sites functionality!', online: false },
     { username: 'MomSupreme', email: 'mom@demo.com', hashedPassword: bcrypt.hashSync('password'), birthday: '02-02-1980', profilePicture: 'https://eandt.theiet.org/media/15948/dreamstime_xxl_151730599.jpg?center=0.78993435448577676,0.49333333333333335&mode=crop&width=640&height=480&rnd=132672110670000000', description: 'I am a demo user for anyone testing out this sites functionality!', online: false },
   ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('Users', null, {});
  }
};
