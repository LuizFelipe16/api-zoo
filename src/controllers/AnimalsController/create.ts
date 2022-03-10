import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Animal from '../../models/Animal';

export default {
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
        
          // Para criar
          const animal = animalsRepository.create({
            name,
            nickname,
            about,
            age,
            nationality,
            savage
          });
        
          // Para salvar no banco
          await animalsRepository.save(animal);
        
          return response.status(201).json(animal);
    }
}