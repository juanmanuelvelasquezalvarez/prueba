let express=require('express')
let fs=require('fs')
let cors=require('cors')({origin:'http://127.0.0.1:5500'/*frontend*/, optionsSuccessStatus:200})
let app=express()
let router=express.Router()
let c=require('mysql').createConnection({host:"localhost",user:"root",password:"",database:"test"})
c.connect(_=>{})
var temas=[]//Cada 1 con id, titulo y descripcion
//En secuencia, insertar en BD y escribir el archivo HTML para cada tema en esta carpeta
function f(i,r){//Al terminar, enviar el JSON
  c.query(`INSERT INTO Tema VALUES('${temas[i][0]}','${temas[i][1]}')`,err=>{
    if(err) r.status(404).json([i,err])//La fila y el error
    else fs.writeFile(`${temas[i][0]}.html`, temas[i][2], err=>{
      if(err) r.status(404).json([i,err])//Por defecto estado 200 que significa correcto
      else if(i<temas.length-1) f(i+1,r)
      else r.json(temas.map(m=>{return {id:m[0], titulo:m[1].replaceAll("COMILLA","'")
      }}).sort((x,y)=>x.titulo.localeCompare(y.titulo)))//Restaurar el caracter y ordenar
    })
  })
}
router.get('/',cors,(_,res)=>{//Ver los datos que ya están en la tabla
  c.query("CREATE TABLE IF NOT EXISTS Tema(id CHAR(255) PRIMARY KEY, titulo CHAR(255))",err=>{
    if(err) res.status(404).json(err)
    else c.query("SELECT * FROM Tema ORDER BY Titulo",(err,q,_)=>{
      res.json(err?err:JSON.parse(JSON.stringify(q).replaceAll("COMILLA","'")))
    })//Ordenar y restaurar el caracter
  })
})
router.get('/carga',cors,async(_,res)=>{//Cargar los datos del REST de Reddit
  temas=(await (await fetch("http://localhost/reddit.json")).json()).data.children.map(m=>[
    m.data.display_name, m.data.title.replaceAll("'","COMILLA"),//Para insertar en la tabla
    m.data.description_html.replaceAll('&amp;','&').replaceAll('&lt;','<')
    .replaceAll('&gt;','>').replaceAll('\\"','"').replaceAll('\\r\\n','<br>').replaceAll('\\n','<br>')
  ])//Reinciciar la inserción de datos
  c.query("DELETE FROM Tema",err=>{
    if(err) res.status(404).json(err)
    else f(0,res)
  })
})
router.get('/tema/:id',cors,(req,res)=>{//Ver el HTML de cada tema de Reddit
  fs.readFile(`${req.params.id}.html`,(err,data)=>{
    if(err) return res.status(404).json(err)
    else res.write(data)
    return res.end()
  })
})
app.use('/',router)
app.listen(3000,()=>{})
