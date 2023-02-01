export default function NormalizedAnimal (animal) {
    
    const { _id, animal_name, tutor, breed, specie, description } = animal

    return {
        id: _id,
        animal_name: animal_name,
        tutor: tutor,
        breed: breed,
        specie: specie,
        description: description,
    }
}