import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';

import Animal from '../models/Animal';
import animalView from '../views/animals_view';

export default {
  async delete(request: Request, response: Response) {
    const { id } = request.params;
    
    const animalsRepository = getRepository(Animal);

    await animalsRepository.delete(id);

    return response.status(200).json({ message: 'O animal deixou o seu Zoo!' });
  },
  
  async index(request: Request, response: Response) {
    const animalsRepository = getRepository(Animal);

    const animals = await animalsRepository.find({
      relations: ['images'],
      order: {
        id: 'ASC'
      }
    });

    return response.status(200).json(animalView.renderMany(animals));
  },

  async show(request: Request, response: Response) {
    const { id } = request.params;

    try {
      const animalsRepository = getRepository(Animal);
  
      const animal = await animalsRepository.findOneOrFail(id, {
        relations: ['images']
      });
  
      return response.status(200).json(animalView.render(animal));
    
    } catch(err) {
      return response.status(400).json({
        error: 'Ocorreu um erro.'
      });
    }
  },

  async create(request: Request, response: Response) {
    const {
      name,
      nickname,
      about,
      age,
      nationality,
      savage
    } = request.body;

    // Passando o Repositorio e o Model
    const animalsRepository = getRepository(Animal);

    const requestImages = request.files as Express.Multer.File[]; // Para dizer que é um upload de multiplos arquivos
    
    const images = requestImages.map(image => {
      return { path: image.filename }
    });

    const data = {
      name,
      nickname: nickname ? nickname : 'Sem Apelido',
      about,
      age,
      nationality: nationality ? nationality : 'Não sei a Nacionalidade dele (-_-)',
      savage: savage == 'true',
      images
    };

    const schema = Yup.object().shape({
      name: Yup.string().required('Ops... Nome é um campo obrigatório'),
      nickname: Yup.string(),
      about: Yup.string().required('Ops... Sobre é um campo obrigatório. Preencha com no máximo 300 caracteres.').max(300),
      age: Yup.string().required('Ops... Idade é um campo obrigatório.'),
      nationality: Yup.string(),
      savage: Yup.boolean().required(),
      images: Yup.array(
        Yup.object().shape({
          path: Yup.string().required(),
        })
      )
    });

    await schema.validate(data, {
      abortEarly: false,
    });

    // Para criar
    const animal = animalsRepository.create(data);

    // Para salvar no banco
    await animalsRepository.save(animal);

    return response.status(201).json(animal);
  }
}