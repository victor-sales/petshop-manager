export default function NormalizedSpecie (specie) {
    
    const { _id, specie_name, description } = specie

    return {
        id: _id,
        specie_name: specie_name,
        description: description
    }
}