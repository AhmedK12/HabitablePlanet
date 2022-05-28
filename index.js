const fs = require('fs')
const parse = require('csv-parse')
const HabitablePlanet = [];


function isHabitablePlanet(planet){
    if(planet['koi_disposition']==="CONFIRMED" && planet['koi_insol']>0.36 && planet['koi_insol']<1.11
    && planet['koi_prad']<1.6)
    return true
}

fs.createReadStream('kepler_data.csv')
.pipe(parse.parse({
    comment : '#',
    columns :true,
}))

.on('data',(data)=>{
    if(isHabitablePlanet(data))
     HabitablePlanet.push(data);
})
.on('end',()=>{
    console.log(`List of Habitableplanet`)
    console.log(HabitablePlanet.map((planet)=>{
        return planet['kepler_name'];
    }))
    console.log('Done');
})
.on('error',(err)=>{
    console.log(err);
})

