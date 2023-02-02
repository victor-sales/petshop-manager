export default function NormalizedBreed (breed) {
    
    const { _id, breed_name, specie, description } = breed

    return {
        id: _id,
        breed_name: breed_name,
        specie: specie,
        description: description,
    }
}