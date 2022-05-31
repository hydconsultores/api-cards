import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cartas } from './cartas.entity';
import { Repository, Not, getConnection, LimitOnUpdateNotSupportedError } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import Config from '../../config/app';
import Axios from 'axios';
import { CartasDto } from './cartas.dto';
import { CartasIndexDto } from '../cartas-index/cartas-index.dto';
import { LenguajesService } from '../lenguajes/lenguajes.service';
import { SuperTiposService } from '../super-tipos/super-tipos.service';
import { TiposService } from '../tipos/tipos.service';
import { SubTiposService } from '../sub-tipos/sub-tipos.service';
import { ColoresService } from '../colores/colores.service';
import { CondicionesService } from '../condiciones/condiciones.service';
import { EdicionesService } from '../ediciones/ediciones.service';
import { RarezasService } from '../rarezas/rarezas.service';
import { TerminacionesService } from '../terminaciones/terminaciones.service';
import { CartasSuperTiposDto } from '../cartas-super-tipos/cartas-super-tipos.dto';
import { CartasTiposDto } from '../cartas-tipos/cartas-tipos.dto';
import { CartasSubTiposDto } from '../cartas-sub-tipos/cartas-sub-tipos.dto';
import { CartasSuperTiposService } from '../cartas-super-tipos/cartas-super-tipos.service';
import { CartasSubTiposService } from '../cartas-sub-tipos/cartas-sub-tipos.service';
import { CartasTiposService } from '../cartas-tipos/cartas-tipos.service';
import { CartasIndexService } from '../cartas-index/cartas-index.service';
import { LenguajesDto } from '../lenguajes/lenguajes.dto';
import { ColoresDto } from '../colores/colores.dto';
import { EdicionesDto } from '../ediciones/ediciones.dto';
import { RarezasDto } from '../rarezas/rarezas.dto';
import { LegalitiesService } from '../legalities/legalities.service';
import { CartasLegalitiesService } from '../cartas-legalities/cartas-legalities.service';
import { CartasLegalitiesDto } from '../cartas-legalities/cartas-legalities.dto';

@Injectable()
export class CartasService {
  constructor(
    @InjectRepository(Cartas)
    private readonly cartasRepository: Repository<Cartas>,
    private readonly lenguajesService: LenguajesService,
    private readonly superTiposService: SuperTiposService,
    private readonly tiposService: TiposService,
    private readonly subTiposService: SubTiposService,
    private readonly coloresService: ColoresService,
    private readonly condicionesService: CondicionesService,
    private readonly edicionesService: EdicionesService,
    private readonly rarezasService: RarezasService,
    private readonly terminacionesService: TerminacionesService,
    private readonly cartasIndexService: CartasIndexService,
    private readonly cartasSuperTiposService: CartasSuperTiposService,
    private readonly cartasSubTiposService: CartasSubTiposService,
    private readonly cartasTiposService: CartasTiposService,
    private readonly legalitiesService: LegalitiesService,
    private readonly cartasLegalitiesService: CartasLegalitiesService,

  ) { }


  async getBusquedaAll(): Promise<CartasDto[]> {
    try {
      let cartas = await this.cartasRepository
        .createQueryBuilder('cartas')
        .select('cartas')
        .innerJoinAndSelect('cartas.id_edicion', 'edicion')
        .innerJoinAndSelect('cartas.id_carta','cartas_index')
        .where('cartas.status=:status', { status: 'ACTIVE' })
        .andWhere('cartas_index > :value',{value:0})
        .orderBy('cartas.nombre', 'ASC')
        .getMany();

      return cartas;
    } catch (ex) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: ex.message,
        },
        500,
      );
    }
  }

  async busquedaGaleriaEdicion(idEdicion: any, desde: any, hasta: any): Promise<any[]> {
    try {
      let cartas = [];

      if (idEdicion !== null && idEdicion !== 'null') {
        cartas = await getConnection().query(
          `SELECT c.*,(select imagen from cartas_index where id_carta= c.id and status='ACTIVE' order by id_carta,id asc limit 1) as imagen,
          (select precio from cartas_index where id_carta= c.id and status='ACTIVE' order by id_carta,id asc limit 1) as precio
          FROM cartas c
          WHERE c.id_edicion=${idEdicion} and c.status='ACTIVE' limit ${desde} offset ${hasta} `);
      } else {
        cartas = await getConnection().query(
          `SELECT c.*,(select imagen from cartas_index where id_carta= c.id and status='ACTIVE' order by id_carta,id asc limit 1) as imagen,
          (select precio from cartas_index where id_carta= c.id and status='ACTIVE' order by id_carta,id asc limit 1) as precio 
          FROM cartas c
          WHERE c.id_edicion=${idEdicion} and  c.status='ACTIVE' limit ${desde} offset ${hasta}  `);

      }

      console.log("cartas", cartas)
      return cartas;
    } catch (ex) {
      console.log(ex);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: ex.message,
        },
        500,
      );
    }
  }
  
  async busquedaAvanzadaGaleria(desde: number, hasta: number, isOrder: string,current:number,
    jsonData:{
      terminaciones: Array<number>;
      condiciones: Array<number>;
      ediciones: Array<number>;
      colores: Array<number>;
      legalities: Array<number>;
      lenguajes: Array<number>;
      rarezas: Array<number>;
      super_tipos: Array<number>;
      tipos: Array<number>;
      sub_tipos: Array<number>;
   })
  : Promise<any> {
    try {
      let cartas = [];
      let contador = 0;
      //Recientes Precio Ascendente  Precio Descendiente
      let ordenamiento = '';
      let leftJoin  = '';
      let whereJoin = '';
      let sqlQuery = '';
      let sqlQueryCount = '';
      let groupBy = '';
      if (isOrder != null && isOrder != "") {
        switch (isOrder) {
          case "Recientes":
            ordenamiento = " order by c.id desc "
            break;

          case "Precio Ascendente":
            ordenamiento = " order by precio asc "
            break;

          case "Precio Descendiente":
            ordenamiento = " order by precio desc "
            break;

          default:
            "Recientes"
            ordenamiento = " order by c.id desc "
            break;

        }

      }

      let offset = 0;
      console.log("desde",desde)
      console.log("current",current)
      if(current == 1 || current == 0){
        offset = 0;
      }else{
        offset = ((current * desde) - desde )+ 1;
      }

      let paginatorCondition = ` limit ${desde} offset ${offset}`;

      sqlQuery += `SELECT c.id,c.nombre,c.numero,c.status,c.created_at,c.updated_at,c.id_edicion
      ,max(ci.precio) as precio,max(ci.imagen) as imagen
      FROM cartas c `;

      sqlQueryCount += `SELECT count(c.id)
      FROM cartas c `;
      
      leftJoin += `LEFT JOIN cartas_index ci on (ci.id_carta=c.id)`;
      whereJoin +=`WHERE  c.status='ACTIVE'`;
      groupBy += `group by c.id,c.nombre,c.numero,c.status,c.created_at,c.updated_at,c.id_edicion`;

      if(jsonData.legalities != null && jsonData.legalities.length>0){
        leftJoin += `LEFT JOIN cartas_legalities cl on (cl.id_carta=c.id)`;
        whereJoin +=` and cl.id_legalities in (${jsonData.legalities})`;
      }
      if(jsonData.super_tipos != null && jsonData.super_tipos.length>0){
        leftJoin += `LEFT JOIN cartas_super_tipos cst on (cst.id_carta=c.id)`;
        whereJoin +=` and cst.id_super_tipo in (${jsonData.super_tipos})`;
      }
      if(jsonData.tipos != null && jsonData.tipos.length>0){
        leftJoin += `LEFT JOIN cartas_tipos ct on (ct.id_carta=c.id)`;
        whereJoin +=` and ct.id_tipo in (${jsonData.tipos})`;
      }
      if(jsonData.sub_tipos != null && jsonData.sub_tipos.length>0){
        leftJoin += `LEFT JOIN cartas_sub_tipos cts on (cts.id_carta=c.id)`;
        whereJoin +=` and cts.id_sub_tipo in (${jsonData.sub_tipos})`;
      }

      if(jsonData.ediciones != null && jsonData.ediciones.length>0){
        whereJoin +=` and c.id_edicion in (${jsonData.ediciones}) `;
      }
      if(jsonData.terminaciones != null && jsonData.terminaciones.length>0){
        whereJoin +=` and ci.id_terminacion in (${jsonData.terminaciones}) `;
      }
      if(jsonData.condiciones != null && jsonData.condiciones.length>0){
        whereJoin +=` and ci.id_condicion in (${jsonData.condiciones}) `;
      }
      if(jsonData.colores != null && jsonData.colores.length>0){
        whereJoin +=` and ci.id_color in (${jsonData.colores}) `;
      }
      if(jsonData.lenguajes != null && jsonData.lenguajes.length>0){
        whereJoin +=` and ci.id_lenguaje in (${jsonData.lenguajes}) `;
      }
      if(jsonData.rarezas != null && jsonData.rarezas.length>0){
        whereJoin +=` and ci.id_rareza in (${jsonData.rarezas}) `;
      }

      sqlQuery += leftJoin + whereJoin + groupBy + ordenamiento + paginatorCondition;
      sqlQueryCount += leftJoin + whereJoin;

      cartas = await getConnection().query(`${sqlQuery}`);
      contador = await getConnection().query(`${sqlQueryCount}`);

      console.log("contador",contador)
      console.log("cartas", cartas)

      return {"cartas": cartas, "contador":contador[0].count };
    } catch (ex) {
      console.log(ex);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: ex.message,
        },
        500,
      );
    }
  }
  async busquedaGaleria(idEdicion: any, desde: number, hasta: number, isOrder: string, current: number): Promise<any> {
    try {
      let cartas = [];
      let ordenamiento = '';
      let contador = 0;
      if (isOrder != null && isOrder != "") {
        switch (isOrder) {
          case "Recientes":
            ordenamiento = " order by c.id desc "
            break;

          case "Precio Ascendente":
            ordenamiento = " order by precio asc "
            break;

          case "Precio Descendiente":
            ordenamiento = " order by precio desc "
            break;

          default:
            "Recientes"
            ordenamiento = " order by c.id desc "
            break;

        }

      }

      let offset = 0;
      console.log("desde",desde)
      console.log("current",current)
      if(current == 1 || current == 0){
        offset = 0;
      }else{
        offset = ((current * desde) - desde )+ 1;
      }

      if (idEdicion !== null && idEdicion !== 'null') {
        console.log(`SELECT c.id,c.nombre,c.numero,c.status,c.created_at,c.updated_at,c.id_edicion
        ,max(ci.precio) as precio,max(ci.imagen) as imagen
        FROM cartas c
        LEFT JOIN cartas_index ci on (ci.id_carta=c.id)
        WHERE  c.id_edicion=${idEdicion} and c.status='ACTIVE'
        group by c.id,c.nombre,c.numero,c.status,c.created_at,c.updated_at,c.id_edicion
        ${ordenamiento} limit ${desde} offset ${offset}`
        )

        cartas = await getConnection().query(
          `SELECT c.id,c.nombre,c.numero,c.status,c.created_at,c.updated_at,c.id_edicion
          ,max(ci.precio) as precio,max(ci.imagen) as imagen
          FROM cartas c
          LEFT JOIN cartas_index ci on (ci.id_carta=c.id)
          WHERE  c.id_edicion=${idEdicion} and c.status='ACTIVE'
          group by c.id,c.nombre,c.numero,c.status,c.created_at,c.updated_at,c.id_edicion
          ${ordenamiento} limit ${desde} offset ${offset}`);

        contador = await getConnection().query(
            `SELECT count(c.id)
            FROM cartas c
            WHERE  c.id_edicion=${idEdicion} and c.status='ACTIVE' `);

      } else {

        console.log(`SELECT c.id,c.nombre,c.numero,c.status,c.created_at,c.updated_at,c.id_edicion
        ,max(ci.precio) as precio,max(ci.imagen) as imagen
        FROM cartas c
        LEFT JOIN cartas_index ci on (ci.id_carta=c.id)
        WHERE  c.status='ACTIVE'
        group by c.id,c.nombre,c.numero,c.status,c.created_at,c.updated_at,c.id_edicion
        ${ordenamiento} limit ${desde} offset ${offset}`)

        cartas = await getConnection().query(`SELECT c.id,c.nombre,c.numero,c.status,c.created_at,c.updated_at,c.id_edicion
        ,max(ci.precio) as precio,max(ci.imagen) as imagen
        FROM cartas c
        LEFT JOIN cartas_index ci on (ci.id_carta=c.id)
        WHERE  c.status='ACTIVE'
        group by c.id,c.nombre,c.numero,c.status,c.created_at,c.updated_at,c.id_edicion
        ${ordenamiento} limit ${desde} offset ${offset}`);

        contador = await getConnection().query(
          `SELECT count(c.id)
          FROM cartas c
          WHERE  c.status='ACTIVE' `);
      }

      return {"cartas": cartas, "contador":contador[0].count };
    } catch (ex) {
      console.log(ex);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: ex.message,
        },
        500,
      );
    }
  }


  async getBusquedaId(id: any): Promise<any> {
    try {

      let cartas = await this.cartasRepository
        .createQueryBuilder('cartas')
        .select('cartas')
        .leftJoinAndSelect('cartas.carta_sub_tipo', 'carta_sub_tipo')
        .leftJoinAndSelect('carta_sub_tipo.id_sub_tipo', 'id_sub_tipo')
        .leftJoinAndSelect('cartas.carta_tipo', 'carta_tipo')
        .leftJoinAndSelect('carta_tipo.id_tipo', 'id_tipo')
        .leftJoinAndSelect('cartas.carta_super_tipo', 'carta_super_tipo')
        .leftJoinAndSelect('carta_super_tipo.id_super_tipo', 'id_super_tipo')
        .leftJoinAndSelect('cartas.carta_legalities', 'carta_legalities')
        .leftJoinAndSelect('carta_legalities.id_legalities', 'id_legalities')
        .where('cartas.id = :id AND cartas.status=:status', { id: id, status: 'ACTIVE' })
        .getOne();

      let cartasIndex = await this.cartasIndexService.getBusquedaIdIndex(id);
      console.log("cartas", cartas)
      return { ...cartas, cartasIndex };
    } catch (ex) {
      console.log(ex);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: ex.message,
        },
        500,
      );
    }
  }

  async getBusquedaNameAndEdition(nombre: any, edicion: string): Promise<any> {
    try {

      let cartas = await this.cartasRepository
        .createQueryBuilder('cartas')
        .select('cartas')
        .innerJoinAndSelect('cartas.id_edicion', 'edicion')
        .where("cartas.nombre like :nombre AND cartas.status=:status AND edicion.nombre like :edicion", { nombre: nombre, status: 'ACTIVE', edicion: edicion })
        .getOne();

      console.log("cartas", cartas)
      return cartas;
    } catch (ex) {
      console.log(ex);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: ex.message,
        },
        500,
      );
    }
  }

  async getBusquedaNombre(nombre: string): Promise<any[]> {
    try {
      console.log("nombre", nombre)
      nombre = nombre.toLowerCase();
      let cartas = await getConnection().query(
        `SELECT c.id,c.nombre,e.nombre as nombre_edicion FROM cartas c 
        LEFT JOIN ediciones e on (c.id_edicion= e.id)
        WHERE LOWER(c.nombre) like '${nombre}%' and c.status='ACTIVE' `);
      return cartas;
    } catch (ex) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: ex.message,
        },
        500,
      );
    }
  }
  async startCron(): Promise<any> {
    try {
      let header = {
        headers: {
        },
        timeout: 30000,
      };

      let contador = 0;

      let lenguajesArr = await this.lenguajesService.findAll();
      let superTiposArr = await this.superTiposService.findAll();
      let tiposArr = await this.tiposService.findAll();
      let subTiposArr = await this.subTiposService.findAll();

      let coloresArr = await this.coloresService.findAll();
      let condicionesArr = await this.condicionesService.findById(1);
      let edicionesArr = await this.edicionesService.findAll();
      let rarezaArr = await this.rarezasService.findAll();
      let terminacionArr = await this.terminacionesService.findById(1);

      let legalitiesArr = await this.legalitiesService.findAll();

      for (let i = 0; i < 1000; i++) {
        contador = 0;
        console.log('/cards?page=' + i)
        const result = await Axios.get(
          process.env.API_CARD + '/cards?page=' + i,
          header,
        );
        if (result != undefined && result !== null
          && result.data !== undefined && result.data.cards.length > 0) {
          for (const cartas of result.data.cards) {

            let carta = await this.getBusquedaNameAndEdition(cartas.name, cartas.setName);
            console.log("carta", carta)
            if (carta === undefined) {

              let cartasDto = new CartasDto();
              cartasDto.nombre = cartas.name;
              cartasDto.numero = cartas.number;
              cartasDto.status = 'ACTIVE';
              cartasDto.created_at = new Date();
              let encontradoEdicion = 0;
              for (const ediciones of edicionesArr) {
                if (ediciones.nombre === cartas.setName) {
                  cartasDto.id_edicion = ediciones;
                  encontradoEdicion = 1;
                  break;
                }
              }
              if (encontradoEdicion === 0) {
                let edicionesDto = new EdicionesDto();
                edicionesDto.created_at = new Date();
                edicionesDto.status = 'ACTIVE';
                edicionesDto.nombre = cartas.setName;
                let edicionesInsertada = await this.edicionesService.create(edicionesDto)
                cartasDto.id_edicion = edicionesInsertada;
                edicionesArr = await this.edicionesService.findAll();
              }

              let cartaInsertada = await this.cartasRepository.save(cartasDto);
              console.log("cartaInsertada", cartaInsertada.nombre)
              contador++
              if (cartaInsertada !== undefined) {
                let cartasIndesDto = new CartasIndexDto();
                //Inserto primero la carta en inglés
                cartasIndesDto.stock = 0;
                cartasIndesDto.precio = 0;
                cartasIndesDto.status = 'ACTIVE';
                cartasIndesDto.created_at = new Date();

                cartasIndesDto.id_carta = cartaInsertada;
                cartasIndesDto.nombre = cartas.name;
                if (cartas.text !== undefined) {
                  cartasIndesDto.texto = cartas.text;
                }

                cartasIndesDto.imagen = cartas.imageUrl;
                cartasIndesDto.flavor = cartas.flavor;
                cartasIndesDto.tipo_concatenado = cartas.originalType;

                for (const lenguajes of lenguajesArr) {
                  if (lenguajes.nombre === 'English') {
                    //console.log("detalle.language", detalle.language)
                    cartasIndesDto.id_lenguaje = lenguajes;
                    break;
                  }
                }

                if (cartas.colors !== undefined) {
                  for (const col of cartas.colors) {
                    let encontradoColor = 0;
                    //console.log("color", col)
                    for (const colores of coloresArr) {
                      if (colores.nombre === col) {
                        //  console.log("encontrado")
                        cartasIndesDto.id_color = colores;
                        encontradoColor = 1;
                        break;
                      }
                    }
                    if (encontradoColor === 0) {
                      //console.log("no encontrado color")
                      let coloresDto = new ColoresDto();
                      coloresDto.created_at = new Date();
                      coloresDto.status = 'ACTIVE';
                      coloresDto.nombre = col;
                      let colorInsertado = await this.coloresService.create(coloresDto)
                      cartasIndesDto.id_color = colorInsertado
                      coloresArr = await this.coloresService.findAll();
                    }
                  }
                }

                cartasIndesDto.id_condicion = condicionesArr;

                let encontradoEdicion = 0;
                for (const ediciones of edicionesArr) {
                  if (ediciones.nombre === cartas.setName) {
                    cartasIndesDto.id_edicion = ediciones;
                    encontradoEdicion = 1;
                    break;
                  }
                }
                if (encontradoEdicion === 0) {
                  let edicionesDto = new EdicionesDto();
                  edicionesDto.created_at = new Date();
                  edicionesDto.status = 'ACTIVE';
                  edicionesDto.nombre = cartas.setName;
                  let edicionInsertada = await this.edicionesService.create(edicionesDto)
                  cartasIndesDto.id_edicion = edicionInsertada;
                  edicionesArr = await this.edicionesService.findAll();
                }

                let encontradoRareza = 0;
                for (const rarezas of rarezaArr) {
                  if (rarezas.nombre === cartas.rarity) {
                    cartasIndesDto.id_rareza = rarezas;
                    encontradoRareza = 1;
                    break;
                  }
                }
                if (encontradoRareza === 0) {
                  let rarezasDto = new RarezasDto();
                  rarezasDto.created_at = new Date();
                  rarezasDto.status = 'ACTIVE';
                  rarezasDto.nombre = cartas.rarity;
                  let rarezasInsertada = await this.rarezasService.create(rarezasDto)
                  cartasIndesDto.id_rareza = rarezasInsertada;
                  rarezaArr = await this.rarezasService.findAll();
                }

                cartasIndesDto.id_terminacion = terminacionArr;
                await this.cartasIndexService.create(cartasIndesDto);
                //termino de crear la carta en ingles
                if (cartas.foreignNames !== undefined) {

                  for (const detalle of cartas.foreignNames) {
                    // console.log("detalle",detalle)
                    // console.log("detalle", detalle)
                    let cartasIndesDto = new CartasIndexDto();
                    //campos default
                    cartasIndesDto.stock = 0;
                    cartasIndesDto.precio = 0;
                    cartasIndesDto.status = 'ACTIVE';
                    cartasIndesDto.created_at = new Date();
                    //campos default

                    cartasIndesDto.id_carta = cartaInsertada;
                    cartasIndesDto.nombre = detalle.name;
                    //console.log("detalle.text", detalle.text)
                    if (detalle.text !== undefined) {
                      cartasIndesDto.texto = detalle.text;
                    }

                    cartasIndesDto.imagen = detalle.imageUrl;
                    cartasIndesDto.flavor = detalle.flavor;
                    cartasIndesDto.tipo_concatenado = detalle.type;

                    let encontradoLenguaje = 0;
                    for (const lenguajes of lenguajesArr) {
                      if (lenguajes.nombre === detalle.language) {
                        //console.log("detalle.language", detalle.language)
                        cartasIndesDto.id_lenguaje = lenguajes;
                        encontradoLenguaje = 1;
                        break;
                      }
                    }
                    if (encontradoLenguaje === 0) {
                      let lenguajeDto = new LenguajesDto();
                      lenguajeDto.created_at = new Date();
                      lenguajeDto.status = 'ACTIVE';
                      lenguajeDto.nombre = detalle.language;
                      let lenguajesInsertado = await this.lenguajesService.create(lenguajeDto)
                      cartasIndesDto.id_lenguaje = lenguajesInsertado;
                      lenguajesArr = await this.lenguajesService.findAll();
                    }

                    if (cartas.colors !== undefined) {
                      for (const col of cartas.colors) {
                        let encontradoColor = 0;
                        //console.log("color", col)
                        for (const colores of coloresArr) {
                          if (colores.nombre === col) {
                            //  console.log("encontrado")
                            cartasIndesDto.id_color = colores;
                            encontradoColor = 1;
                            break;
                          }
                        }
                        if (encontradoColor === 0) {
                          //console.log("no encontrado color")
                          let coloresDto = new ColoresDto();
                          coloresDto.created_at = new Date();
                          coloresDto.status = 'ACTIVE';
                          coloresDto.nombre = col;
                          let coloresInsertado = await this.coloresService.create(coloresDto)
                          cartasIndesDto.id_color = coloresInsertado;
                          coloresArr = await this.coloresService.findAll();
                        }
                      }
                    }

                    cartasIndesDto.id_condicion = condicionesArr;

                    let encontradoEdicion = 0;
                    for (const ediciones of edicionesArr) {
                      if (ediciones.nombre === cartas.setName) {
                        cartasIndesDto.id_edicion = ediciones;
                        encontradoEdicion = 1;
                        break;
                      }
                    }
                    if (encontradoEdicion === 0) {
                      let edicionesDto = new EdicionesDto();
                      edicionesDto.created_at = new Date();
                      edicionesDto.status = 'ACTIVE';
                      edicionesDto.nombre = cartas.setName;
                      let edicionesInsertado = await this.edicionesService.create(edicionesDto)
                      cartasIndesDto.id_edicion = edicionesInsertado;
                      edicionesArr = await this.edicionesService.findAll();
                    }

                    let encontradoRareza = 0;
                    for (const rarezas of rarezaArr) {
                      if (rarezas.nombre === cartas.rarity) {
                        cartasIndesDto.id_rareza = rarezas;
                        encontradoRareza = 1;
                        break;
                      }
                    }
                    if (encontradoRareza === 0) {
                      let rarezasDto = new RarezasDto();
                      rarezasDto.created_at = new Date();
                      rarezasDto.status = 'ACTIVE';
                      rarezasDto.nombre = cartas.rarity;
                      let rarezasInsertada = await this.rarezasService.create(rarezasDto)
                      cartasIndesDto.id_rareza = rarezasInsertada;
                      rarezaArr = await this.rarezasService.findAll();
                    }

                    cartasIndesDto.id_terminacion = terminacionArr;
                    await this.cartasIndexService.create(cartasIndesDto);
                  }
                }


                if (cartas.supertypes !== undefined) {
                  for (const supertips of superTiposArr) {
                    for (const cartaSuperTips of cartas.supertypes) {
                      if (supertips.nombre === cartaSuperTips) {
                        let cartasSuperTiposDto = new CartasSuperTiposDto();
                        cartasSuperTiposDto.id_carta = cartaInsertada;
                        cartasSuperTiposDto.id_super_tipo = supertips;
                        await this.cartasSuperTiposService.create(cartasSuperTiposDto);
                      }
                    }

                  }
                }


                if (cartas.types !== undefined) {
                  for (const tips of tiposArr) {
                    for (const cartasTips of cartas.types) {
                      if (tips.nombre === cartasTips) {
                        let cartasTiposDto = new CartasTiposDto();
                        cartasTiposDto.id_carta = cartaInsertada;
                        cartasTiposDto.id_tipo = tips;
                        await this.cartasTiposService.create(cartasTiposDto);
                      }
                    }
                  }
                }

                if (cartas.subtypes !== undefined) {
                  for (const subtypes of subTiposArr) {
                    for (const cartasSubTips of cartas.subtypes) {
                      if (subtypes.nombre === cartasSubTips) {
                        let cartasSubTiposDto = new CartasSubTiposDto();
                        cartasSubTiposDto.id_carta = cartaInsertada;
                        cartasSubTiposDto.id_sub_tipo = subtypes;
                        await this.cartasSubTiposService.create(cartasSubTiposDto);
                      }
                    }
                  }
                }

                if (cartas.legalities !== undefined) {
                  for (const legal of legalitiesArr) {
                    for (const cartaLegalities of cartas.legalities) {
                      if (legal.nombre === cartaLegalities.format) {
                        let cartasLegalitiesDto = new CartasLegalitiesDto();
                        cartasLegalitiesDto.id_carta = cartaInsertada;
                        cartasLegalitiesDto.id_legalities = legal;
                        cartasLegalitiesDto.valor = cartaLegalities.legality
                        await this.cartasLegalitiesService.create(cartasLegalitiesDto);
                      }
                    }

                  }
                }

              }
            }
          }
          console.log("contador", contador)
        }
      }
      return contador;

    } catch (ex) {
      console.log("ex", ex)
      throw new HttpException(
        {
          status: 500,
          error: ex
        },
        500,
      );
    }
  }
}
