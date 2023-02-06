export default function NormalizedService (service) {
    
    const { _id, service_name, date, tutor, breed, specie, description, simptoms, is_confirmed } = service

    return {
        id: _id,
        service_name: service_name,
        date: date,
        tutor: tutor,
        breed: breed,
        specie: specie,
        description: description,
        simptoms: simptoms,
        is_confirmed: is_confirmed
    }
}