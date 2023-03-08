import React from "react"
import { Services } from "../../utils/Enums"
import BadRequest from "../../utils/ErrorsObj/BadRequest"
import { animalIsInvalid, breedIsInvalid, capitalizeFirst, checkAmountValidity, checkAnimalNameValidity, checkBrandValidity, checkBreedNameValidity, checkBreedValidity, checkCashierValidity, checkDateValidity, checkEmailValidity, checkProductNameValidity, checkProfileValidity, checkRoleValidity, checkSellAmountValidity, checkServiceNameValidity, checkSimptomsValidity, checkSpecieNameValidity, checkSpecieValidity, checkTutorValidity, checkTypeValidity, checkUsernameValidity, checkVetValidity, productIsInvalid, sellIsInvalid, serviceIsInvalid, specieIsInvalid, userIsInvalid } from "../../utils/Helpers"

describe("Validate User" , () => {
    
    let error = BadRequest()
    let invalid = null
    let body = null
    let req = null

    afterEach(() => {
        error = BadRequest()
        invalid = null
        body = null
        req = null
    });

    it("should return a Bad Request if body not present", () => {
        
        error = {...error, details: "Body not found"}
        
        invalid = userIsInvalid()

        expect(invalid).toStrictEqual(error)
        expect(invalid.status).toBe(error.status)
        expect(invalid.details).toBe(error.details)
        expect(invalid.message).toBe(error.message)
    })
    
    it("should return a Bad Request if email not present", () => {
        
        body = JSON.stringify({ email: "" })
        
        req = { body: body }
        
        error = {...error, details: "Email is required"}
        
        invalid = userIsInvalid(req)
        
        expect(invalid).toStrictEqual(error)
        expect(invalid.details).toBe(error.details)
    })
    
    it("should return a Bad Request if user_name not present", () => {
        
        body = JSON.stringify({ email: "email.teste@email.com", user_name: "" })
        
        req = { body: body }
        
        error = {...error, details: "Username is required"}
        
        invalid = userIsInvalid(req)
        
        expect(invalid).toStrictEqual(error)
        expect(invalid.details).toStrictEqual(error.details)
    })

    it("should return false if user is valid", () => {
        body = JSON.stringify({ email: "user.teste@email.com", user_name: "User Teste" })
        
        req = { body: body }

        invalid = userIsInvalid(req)

        expect(invalid).toBe(false)

    })
})

describe("Validate Animal" , () => {
    
    let error = BadRequest()
    let invalid = null
    let body = null
    let req = null

    afterEach(() => {
        error = BadRequest()
        invalid = null
        body = null
        req = null
    });

    const animal = {animal_name: "animal", tutor: {_id: "123", name: "tutor"}, breed: {_id: "123", name: "breed"}, specie: {_id:"123", name: "specie"} }

    it("should return a Bad Request if body not present", () => {
        
        error = {...error, details: "Body not found"}
        
        invalid = animalIsInvalid()

        expect(invalid).toStrictEqual(error)
        expect(invalid.status).toBe(error.status)
        expect(invalid.details).toBe(error.details)
        expect(invalid.message).toBe(error.message)
    })
    
    
    it("should return a Bad Request if name not present", () => {
        
        body = JSON.stringify({animal_name: "", tutor: {_id: "123", name: "tutor"}, breed: {_id: "123", name: "breed"}, specie: {_id:"123", name: "specie"}})
        
        req = { body: body }
        
        error = {...error, details: "Animal name is required"}
        
        invalid = animalIsInvalid(req)
        
        expect(invalid).toStrictEqual(error)
        expect(invalid.details).toStrictEqual(error.details)
    })

    it("should return a Bad Request if tutor not present", () => {
        
        body = JSON.stringify({ animal_name: "animal", breed: {_id: "123", name: "breed"}, specie: {_id:"123", name: "specie"}  })
        
        req = { body: body }
        
        error = {...error, details: "Tutor is required"}
        
        invalid = animalIsInvalid(req)
        
        expect(invalid).toStrictEqual(error)
        expect(invalid.details).toStrictEqual(error.details)
    })

    it("should return a Bad Request if breed not present", () => {
        
        body = JSON.stringify({ animal_name: "animal", tutor: {_id: "123", name: "tutor"}, specie: {_id:"123", name: "specie"} })
        
        req = { body: body }
        
        error = {...error, details: "Breed is required"}
        
        invalid = animalIsInvalid(req)
        
        expect(invalid).toStrictEqual(error)
        expect(invalid.details).toStrictEqual(error.details)
    })

    it("should return a Bad Request if specie not present", () => {
        
        body = JSON.stringify({animal_name: "animal", tutor: {_id: "123", name: "tutor"}, breed: {_id: "123", name: "breed"} })
        
        req = { body: body }
        
        error = {...error, details: "Specie is required"}
        
        invalid = animalIsInvalid(req)
        
        expect(invalid).toStrictEqual(error)
        expect(invalid.details).toStrictEqual(error.details)
    })

    it("should return false if animal is valid", () => {
        body = JSON.stringify(animal)
        
        req = { body: body }

        invalid = animalIsInvalid(req)

        expect(invalid).toBe(false)

    })
})

describe("Validate Service" , () => {
    
    let error = BadRequest()
    let invalid = null
    let body = null
    let req = null

    afterEach(() => {
        error = BadRequest()
        invalid = null
        body = null
        req = null
    });

    const service = {service_name: Services.CONSULTA, date: new Date(), tutor: {_id: "123", name: "tutor"}, breed: {_id: "123", name: "breed"}, specie: {_id:"123", name: "specie"}, simptoms: "sick" }

    it("should return a Bad Request if body not present", () => {
        
        error = {...error, details: "Body not found"}
        
        invalid = serviceIsInvalid()

        expect(invalid).toStrictEqual(error)
        expect(invalid.status).toBe(error.status)
        expect(invalid.details).toBe(error.details)
        expect(invalid.message).toBe(error.message)
    })
    
    
    it("should return a Bad Request if name not present", () => {
        
        body = JSON.stringify({ date: new Date(), tutor: {_id: "123", name: "tutor"}, breed: {_id: "123", name: "breed"}, specie: {_id:"123", name: "specie"}, simptoms: "sick" })
        
        req = { body: body }
        
        error = {...error, details: "Service name is required"}
        
        invalid = serviceIsInvalid(req)
        
        expect(invalid).toStrictEqual(error)
        expect(invalid.details).toStrictEqual(error.details)
    })

    it("should return a Bad Request if tutor not present", () => {
        
        body = JSON.stringify({service_name: Services.CONSULTA, date: new Date(), breed: {_id: "123", name: "breed"}, specie: {_id:"123", name: "specie"}, simptoms: "sick" })
        
        req = { body: body }
        
        error = {...error, details: "Tutor is required"}
        
        invalid = serviceIsInvalid(req)
        
        expect(invalid).toStrictEqual(error)
        expect(invalid.details).toStrictEqual(error.details)
    })

    it("should return a Bad Request if date is not present", () => {
        
        body = JSON.stringify({service_name: Services.CONSULTA, tutor: {_id: "123", name: "tutor"}, breed: {_id: "123", name: "breed"}, specie: {_id:"123", name: "specie"}, simptoms: "sick" })
        
        req = { body: body }
        
        error = {...error, details: "Date is required"}
        
        invalid = serviceIsInvalid(req)
        
        expect(invalid).toStrictEqual(error)
        expect(invalid.details).toStrictEqual(error.details)
    })

    it("should return a Bad Request if breed not present", () => {
        
        body = JSON.stringify({service_name: Services.CONSULTA, date: new Date(), tutor: {_id: "123", name: "tutor"}, specie: {_id:"123", name: "specie"}, simptoms: "sick" })
        
        req = { body: body }
        
        error = {...error, details: "Breed is required"}
        
        invalid = serviceIsInvalid(req)
        
        expect(invalid).toStrictEqual(error)
        expect(invalid.details).toStrictEqual(error.details)
    })

    it("should return a Bad Request if specie not present", () => {
        
        body = JSON.stringify({service_name: Services.CONSULTA, date: new Date(), tutor: {_id: "123", name: "tutor"}, breed: {_id: "123", name: "breed"}, simptoms: "sick" })
        
        req = { body: body }
        
        error = {...error, details: "Specie is required"}
        
        invalid = serviceIsInvalid(req)
        
        expect(invalid).toStrictEqual(error)
        expect(invalid.details).toStrictEqual(error.details)
    })

    it("should return a Bad Request if service is Consulta and simptoms not present", () => {
        
        body = JSON.stringify({service_name: Services.CONSULTA, date: new Date(), tutor: {_id: "123", name: "tutor"},  specie: {_id:"123", name: "specie"}, breed: {_id: "123", name: "breed"} })
        
        req = { body: body }
        
        error = {...error, details: "Simptoms are required"}
        
        invalid = serviceIsInvalid(req)
        
        expect(invalid).toStrictEqual(error)
        expect(invalid.details).toStrictEqual(error.details)
    })

    it("should return false if service is valid", () => {
        body = JSON.stringify(service)
        
        req = { body: body }

        invalid = serviceIsInvalid(req)

        expect(invalid).toBe(false)

    })
})

describe("Validate Sale" , () => {
    
    let error = BadRequest()
    let invalid = null
    let body = null
    let req = null

    afterEach(() => {
        error = BadRequest()
        invalid = null
        body = null
        req = null
    });

    const sale = {date: new Date(), cashier: {_id: "123", name: "cashier"}, buyer: {_id: "123", name: "buyer"}, product: {_id:"123", name: "product"}, amount: '1' }

    it("should return a Bad Request if body not present", () => {
        
        error = {...error, details: "Body not found"}
        
        invalid = serviceIsInvalid()

        expect(invalid).toStrictEqual(error)
        expect(invalid.status).toBe(error.status)
        expect(invalid.details).toBe(error.details)
        expect(invalid.message).toBe(error.message)
    })
    
    
    it("should return a Bad Request if date not present", () => {
        
        body = JSON.stringify({cashier: {_id: "123", name: "cashier"}, buyer: {_id: "123", name: "buyer"}, product: {_id:"123", name: "product"}, amount: '1' })
        
        req = { body: body }
        
        error = {...error, details: "Date is required"}
        
        invalid = sellIsInvalid(req)
        
        expect(invalid).toStrictEqual(error)
        expect(invalid.details).toStrictEqual(error.details)
    })

    it("should return a Bad Request if cashier not present", () => {
        
        body = JSON.stringify({date: new Date(), buyer: {_id: "123", name: "buyer"}, product: {_id:"123", name: "product"}, amount: '1' })
        
        req = { body: body }
        
        error = {...error, details: "Cashier is required"}
        
        invalid = sellIsInvalid(req)
        
        expect(invalid).toStrictEqual(error)
        expect(invalid.details).toStrictEqual(error.details)
    })

    it("should return a Bad Request if buyer is not present", () => {
        
        body = JSON.stringify({date: new Date(), cashier: {_id: "123", name: "cashier"}, product: {_id:"123", name: "product"}, amount: '1' })
        
        req = { body: body }
        
        error = {...error, details: "Buyer is required"}
        
        invalid = sellIsInvalid(req)
        
        expect(invalid).toStrictEqual(error)
        expect(invalid.details).toStrictEqual(error.details)
    })

    it("should return a Bad Request if product not present", () => {
        
        body = JSON.stringify({date: new Date(), cashier: {_id: "123", name: "cashier"}, buyer: {_id: "123", name: "buyer"}, amount: '1' })
        
        req = { body: body }
        
        error = {...error, details: "Product is required"}
        
        invalid = sellIsInvalid(req)
        
        expect(invalid).toStrictEqual(error)
        expect(invalid.details).toStrictEqual(error.details)
    })

    it("should return a Bad Request if amount not present", () => {
        
        body = JSON.stringify({date: new Date(), cashier: {_id: "123", name: "cashier"}, buyer: {_id: "123", name: "buyer"}, product: {_id:"123", name: "product"}})
        
        req = { body: body }
        
        error = {...error, details: "Amount is required"}
        
        invalid = sellIsInvalid(req)
        
        expect(invalid).toStrictEqual(error)
        expect(invalid.details).toStrictEqual(error.details)
    })

    it("should return false if service is valid", () => {
        body = JSON.stringify(sale)
        
        req = { body: body }

        invalid = sellIsInvalid(req)

        expect(invalid).toBe(false)

    })
})

describe("Validate Product" , () => {
    
    let error = BadRequest()
    let invalid = null
    let body = null
    let req = null

    afterEach(() => {
        error = BadRequest()
        invalid = null
        body = null
        req = null
    });

    const product = {product_name: "product", brand: "brand", type: "type", price: "20", amount: 1 }

    it("should return a Bad Request if body not present", () => {
        
        error = {...error, details: "Body not found"}
        
        invalid = serviceIsInvalid()

        expect(invalid).toStrictEqual(error)
        expect(invalid.status).toBe(error.status)
        expect(invalid.details).toBe(error.details)
        expect(invalid.message).toBe(error.message)
    })
    
    
    it("should return a Bad Request if name not present", () => {
        
        body = JSON.stringify({brand: "brand", type: "type", price: "20", amount: 1 })
        
        req = { body: body }
        
        error = {...error, details: "Product name is required"}
        
        invalid = productIsInvalid(req)
        
        expect(invalid).toStrictEqual(error)
        expect(invalid.details).toStrictEqual(error.details)
    })

    it("should return a Bad Request if brand not present", () => {
        
        body = JSON.stringify({product_name: "product", type: "type", price: "20", amount: 1 })
        
        req = { body: body }
        
        error = {...error, details: "Brand is required"}
        
        invalid = productIsInvalid(req)
        
        expect(invalid).toStrictEqual(error)
        expect(invalid.details).toStrictEqual(error.details)
    })

    it("should return a Bad Request if type is not present", () => {
        
        body = JSON.stringify({product_name: "product", brand: "brand", price: "20", amount: 1 })
        
        req = { body: body }
        
        error = {...error, details: "Type is required"}
        
        invalid = productIsInvalid(req)
        
        expect(invalid).toStrictEqual(error)
        expect(invalid.details).toStrictEqual(error.details)
    })

    it("should return a Bad Request if price not present", () => {
        
        body = JSON.stringify({product_name: "product", brand: "brand", type: "type", amount: 1 })
        
        req = { body: body }
        
        error = {...error, details: "Price is required"}
        
        invalid = productIsInvalid(req)
        
        expect(invalid).toStrictEqual(error)
        expect(invalid.details).toStrictEqual(error.details)
    })

    it("should return a Bad Request if amount not present", () => {
        
        body = JSON.stringify({product_name: "product", brand: "brand", type: "type", price: "20"})
        
        req = { body: body }
        
        error = {...error, details: "Amount is required"}
        
        invalid = productIsInvalid(req)
        
        expect(invalid).toStrictEqual(error)
        expect(invalid.details).toStrictEqual(error.details)
    })


    it("should return false if service is valid", () => {
        body = JSON.stringify(product)
        
        req = { body: body }

        invalid = productIsInvalid(req)

        expect(invalid).toBe(false)

    })
})

describe("Validate specie" , () => {
    
    let error = BadRequest()
    let invalid = null
    let body = null
    let req = null

    afterEach(() => {
        error = BadRequest()
        invalid = null
        body = null
        req = null
    });

    const specie = {specie_name: "specie", description: "" }

    it("should return a Bad Request if body not present", () => {
        
        error = {...error, details: "Body not found"}
        
        invalid = specieIsInvalid()

        expect(invalid).toStrictEqual(error)
        expect(invalid.status).toBe(error.status)
        expect(invalid.details).toBe(error.details)
        expect(invalid.message).toBe(error.message)
    })
    
    
    it("should return a Bad Request if name not present", () => {
        
        body = JSON.stringify({description: ""})
        
        req = { body: body }
        
        error = {...error, details: "Specie name is required"}
        
        invalid = specieIsInvalid(req)
        
        expect(invalid).toStrictEqual(error)
        expect(invalid.details).toStrictEqual(error.details)
    })

    it("should return false if service is valid", () => {
        body = JSON.stringify(specie)
        
        req = { body: body }

        invalid = specieIsInvalid(req)

        expect(invalid).toBe(false)

    })
})

describe("Validate breed" , () => {
    
    let error = BadRequest()
    let invalid = null
    let body = null
    let req = null

    afterEach(() => {
        error = BadRequest()
        invalid = null
        body = null
        req = null
    });

    const breed = {breed_name: "breed", specie: {_id: "123", name: "specie"},  description: "" }

    it("should return a Bad Request if body not present", () => {
        
        error = {...error, details: "Body not found"}
        
        invalid = breedIsInvalid()

        expect(invalid).toStrictEqual(error)
        expect(invalid.status).toBe(error.status)
        expect(invalid.details).toBe(error.details)
        expect(invalid.message).toBe(error.message)
    })
    
    it("should return a Bad Request if name not present", () => {
        
        body = JSON.stringify({specie: {_id: "123", name: "specie"},  description: "" })
        
        req = { body: body }
        
        error = {...error, details: "Breed name is required"}
        
        invalid = breedIsInvalid(req)
        
        expect(invalid).toStrictEqual(error)
        expect(invalid.details).toStrictEqual(error.details)
    })

    it("should return a Bad Request if specie not present", () => {
        
        body = JSON.stringify({breed_name: "breed", description: "" })
        
        req = { body: body }
        
        error = {...error, details: "Specie is required"}
        
        invalid = breedIsInvalid(req)
        
        expect(invalid).toStrictEqual(error)
        expect(invalid.details).toStrictEqual(error.details)
    })

    it("should return false if service is valid", () => {
        body = JSON.stringify(breed)
        
        req = { body: body }

        invalid = breedIsInvalid(req)

        expect(invalid).toBe(false)

    })
})

describe("capitalizeFirst", () => {
    it("should return the first letter capitalized", () => {
        let string = "teste"

        string = capitalizeFirst(string)

        expect(string).toBe("Teste")

    })
})

describe("checkUsernameValidity", () => {
    const setErrorMock = jest.fn()
    jest.spyOn(React, "useState").mockImplementationOnce(initState => [initState, setErrorMock])

    it("should return true if value", () => {
        const value = "value"
        const validity = checkUsernameValidity(value, setErrorMock)

        expect(validity).toBe(true)
    })

    it("should return false if !value", () => {
        const value = ""
        const validity = checkUsernameValidity(value, setErrorMock)

        expect(validity).toBe(false)
    })

    it("shoud setError", () => {
        const value = ""
        checkUsernameValidity(value, setErrorMock)

        expect(setErrorMock).toHaveBeenCalledWith("Nome não pode ser vazio.")
    })
})

describe("checkEmailValidity", () => {
    const setErrorMock = jest.fn()
    jest.spyOn(React, "useState").mockImplementationOnce(initState => [initState, setErrorMock])

    it("should return true if value", () => {
        const value = "value"
        const validity = checkEmailValidity(value, setErrorMock)

        expect(validity).toBe(true)
    })

    it("should return false if !value", () => {
        const value = ""
        const validity = checkEmailValidity(value, setErrorMock)

        expect(validity).toBe(false)
    })

    it("shoud setError", () => {
        const value = ""
        checkEmailValidity(value, setErrorMock)

        expect(setErrorMock).toHaveBeenCalledWith("Email não pode ser vazio.")
    })
})

describe("checkProfileValidity", () => {
    const setErrorMock = jest.fn()
    jest.spyOn(React, "useState").mockImplementationOnce(initState => [initState, setErrorMock])

    it("should return true if value", () => {
        const value = "value"
        const validity = checkProfileValidity(value, setErrorMock)

        expect(validity).toBe(true)
    })

    it("should return false if !value", () => {
        const value = ""
        const validity = checkProfileValidity(value, setErrorMock)

        expect(validity).toBe(false)
    })

    it("shoud setError", () => {
        const value = ""
        checkProfileValidity(value, setErrorMock)

        expect(setErrorMock).toHaveBeenCalledWith("Profile não pode ser vazio.")
    })
})

describe("checkRoleValidity", () => {
    const setErrorMock = jest.fn()
    jest.spyOn(React, "useState").mockImplementationOnce(initState => [initState, setErrorMock])

    it("should return true if value", () => {
        const value = "value"
        const validity = checkRoleValidity(value, setErrorMock)

        expect(validity).toBe(true)
    })

    it("should return false if !value", () => {
        const value = ""
        const validity = checkRoleValidity(value, setErrorMock)

        expect(validity).toBe(false)
    })

    it("shoud setError", () => {
        const value = ""
        checkRoleValidity(value, setErrorMock)

        expect(setErrorMock).toHaveBeenCalledWith("Função não pode ser vazia.")
    })
})

describe("checkAnimalNameValidity", () => {
    const setErrorMock = jest.fn()
    jest.spyOn(React, "useState").mockImplementationOnce(initState => [initState, setErrorMock])

    it("should return true if value", () => {
        const value = "value"
        const validity = checkAnimalNameValidity(value, setErrorMock)

        expect(validity).toBe(true)
    })

    it("should return false if !value", () => {
        const value = ""
        const validity = checkAnimalNameValidity(value, setErrorMock)

        expect(validity).toBe(false)
    })

    it("shoud setError", () => {
        const value = ""
        checkAnimalNameValidity(value, setErrorMock)

        expect(setErrorMock).toHaveBeenCalledWith("Nome não pode ser vazio.")
    })
})

describe("checkTutorValidity", () => {
    const setErrorMock = jest.fn()
    jest.spyOn(React, "useState").mockImplementationOnce(initState => [initState, setErrorMock])

    it("should return true if value", () => {
        const value = "value"
        const validity = checkTutorValidity(value, setErrorMock)

        expect(validity).toBe(true)
    })

    it("should return false if !value", () => {
        const value = ""
        const validity = checkTutorValidity(value, setErrorMock)

        expect(validity).toBe(false)
    })

    it("shoud setError", () => {
        const value = ""
        checkTutorValidity(value, setErrorMock)

        expect(setErrorMock).toHaveBeenCalledWith("Tutor não pode ser vazio.")
    })
})

describe("checkVetValidity", () => {
    const setErrorMock = jest.fn()
    jest.spyOn(React, "useState").mockImplementationOnce(initState => [initState, setErrorMock])

    it("should return true if value", () => {
        const value = "value"
        const validity = checkVetValidity(value, setErrorMock)

        expect(validity).toBe(true)
    })

    it("should return false if !value", () => {
        const value = ""
        const validity = checkVetValidity(value, setErrorMock)

        expect(validity).toBe(false)
    })

    it("shoud setError", () => {
        const value = ""
        checkVetValidity(value, setErrorMock)

        expect(setErrorMock).toHaveBeenCalledWith("Veterinário não pode ser vazio.")
    })
})

describe("checkSpecieValidity", () => {
    const setErrorMock = jest.fn()
    jest.spyOn(React, "useState").mockImplementationOnce(initState => [initState, setErrorMock])

    it("should return true if value", () => {
        const value = "value"
        const validity = checkSpecieValidity(value, setErrorMock)

        expect(validity).toBe(true)
    })

    it("should return false if !value", () => {
        const value = ""
        const validity = checkSpecieValidity(value, setErrorMock)

        expect(validity).toBe(false)
    })

    it("shoud setError", () => {
        const value = ""
        checkSpecieValidity(value, setErrorMock)

        expect(setErrorMock).toHaveBeenCalledWith("Espécie não pode ser vazia.")
    })
})

describe("checkBreedValidity", () => {
    const setErrorMock = jest.fn()
    jest.spyOn(React, "useState").mockImplementationOnce(initState => [initState, setErrorMock])

    it("should return true if value", () => {
        const value = "value"
        const validity = checkBreedValidity(value, setErrorMock)

        expect(validity).toBe(true)
    })

    it("should return false if !value", () => {
        const value = ""
        const validity = checkBreedValidity(value, setErrorMock)

        expect(validity).toBe(false)
    })

    it("shoud setError", () => {
        const value = ""
        checkBreedValidity(value, setErrorMock)

        expect(setErrorMock).toHaveBeenCalledWith("Raça não pode ser vazia.")
    })
})

describe("checkSpecieNameValidity", () => {
    const setErrorMock = jest.fn()
    jest.spyOn(React, "useState").mockImplementationOnce(initState => [initState, setErrorMock])

    it("should return true if value", () => {
        const value = "value"
        const validity = checkSpecieNameValidity(value, setErrorMock)

        expect(validity).toBe(true)
    })

    it("should return false if !value", () => {
        const value = ""
        const validity = checkSpecieNameValidity(value, setErrorMock)

        expect(validity).toBe(false)
    })

    it("shoud setError", () => {
        const value = ""
        checkSpecieNameValidity(value, setErrorMock)

        expect(setErrorMock).toHaveBeenCalledWith("Espécie não pode ser vazia.")
    })
})

describe("checkBreedNameValidity", () => {
    const setErrorMock = jest.fn()
    jest.spyOn(React, "useState").mockImplementationOnce(initState => [initState, setErrorMock])

    it("should return true if value", () => {
        const value = "value"
        const validity = checkBreedNameValidity(value, setErrorMock)

        expect(validity).toBe(true)
    })

    it("should return false if !value", () => {
        const value = ""
        const validity = checkBreedNameValidity(value, setErrorMock)

        expect(validity).toBe(false)
    })

    it("shoud setError", () => {
        const value = ""
        checkBreedNameValidity(value, setErrorMock)

        expect(setErrorMock).toHaveBeenCalledWith("Raça não pode ser vazia.")
    })
})

describe("checkServiceNameValidity", () => {
    const setErrorMock = jest.fn()
    jest.spyOn(React, "useState").mockImplementationOnce(initState => [initState, setErrorMock])

    it("should return true if value", () => {
        const value = "value"
        const validity = checkServiceNameValidity(value, setErrorMock)

        expect(validity).toBe(true)
    })

    it("should return false if !value", () => {
        const value = ""
        const validity = checkServiceNameValidity(value, setErrorMock)

        expect(validity).toBe(false)
    })

    it("shoud setError", () => {
        const value = ""
        checkServiceNameValidity(value, setErrorMock)

        expect(setErrorMock).toHaveBeenCalledWith("Serviço não pode ser vazio.")
    })
})

describe("checkSimptomsValidity", () => {
    const setErrorMock = jest.fn()
    jest.spyOn(React, "useState").mockImplementationOnce(initState => [initState, setErrorMock])

    it("should return true if value", () => {
        const value = "value"
        const validity = checkSimptomsValidity(value, setErrorMock)

        expect(validity).toBe(true)
    })

    it("should return false if !value", () => {
        const value = ""
        const validity = checkSimptomsValidity(value, setErrorMock)

        expect(validity).toBe(false)
    })

    it("shoud setError", () => {
        const value = ""
        checkSimptomsValidity(value, setErrorMock)

        expect(setErrorMock).toHaveBeenCalledWith("Sintomas não pode ser vazio.")
    })
})

describe("checkDateValidity", () => {
    const setErrorMock = jest.fn()
    jest.spyOn(React, "useState").mockImplementationOnce(initState => [initState, setErrorMock])

    it("should return true if value", () => {
        const value = new Date()
        value.setHours(14, 0, 0, 0)

        const validity = checkDateValidity(value, setErrorMock)

        expect(validity).toBe(true)
    })

    it("should return false if !value", () => {
        const value = ""
        const validity = checkDateValidity(value, setErrorMock)

        expect(validity).toBe(false)
    })

    it("should return false if hour > 18 ", () => {
        const value = new Date()
        value.setHours(19, 0, 0, 0)
        
        const validity = checkDateValidity(value, setErrorMock)

        expect(validity).toBe(false)
    })

    it("should return false if hour < 8 ", () => {
        const value = new Date()
        value.setHours(7, 0, 0, 0)      
        
        const validity = checkDateValidity(value, setErrorMock)

        expect(validity).toBe(false)
    })

    it("shoud setError", () => {
        const value = ""
        checkDateValidity(value, setErrorMock)

        expect(setErrorMock).toHaveBeenCalledWith("Data não pode ser vazia.")
    })
})

describe("checkProductNameValidity", () => {
    const setErrorMock = jest.fn()
    jest.spyOn(React, "useState").mockImplementationOnce(initState => [initState, setErrorMock])

    it("should return true if value", () => {
        const value = "value"
        const validity = checkProductNameValidity(value, setErrorMock)

        expect(validity).toBe(true)
    })

    it("should return false if !value", () => {
        const value = ""
        const validity = checkProductNameValidity(value, setErrorMock)

        expect(validity).toBe(false)
    })

    it("shoud setError", () => {
        const value = ""
        checkProductNameValidity(value, setErrorMock)

        expect(setErrorMock).toHaveBeenCalledWith("Nome do produto não pode ser vazio.")
    })
})

describe("checkBrandValidity", () => {
    const setErrorMock = jest.fn()
    jest.spyOn(React, "useState").mockImplementationOnce(initState => [initState, setErrorMock])

    it("should return true if value", () => {
        const value = "value"
        const validity = checkBrandValidity(value, setErrorMock)

        expect(validity).toBe(true)
    })

    it("should return false if !value", () => {
        const value = ""
        const validity = checkBrandValidity(value, setErrorMock)

        expect(validity).toBe(false)
    })

    it("shoud setError", () => {
        const value = ""
        checkBrandValidity(value, setErrorMock)

        expect(setErrorMock).toHaveBeenCalledWith("Marca não pode ser vazia.")
    })
})

describe("checkTypeValidity", () => {
    const setErrorMock = jest.fn()
    jest.spyOn(React, "useState").mockImplementationOnce(initState => [initState, setErrorMock])

    it("should return true if value", () => {
        const value = "value"
        const validity = checkTypeValidity(value, setErrorMock)

        expect(validity).toBe(true)
    })

    it("should return false if !value", () => {
        const value = ""
        const validity = checkTypeValidity(value, setErrorMock)

        expect(validity).toBe(false)
    })

    it("shoud setError", () => {
        const value = ""
        checkTypeValidity(value, setErrorMock)

        expect(setErrorMock).toHaveBeenCalledWith("Tipo não pode ser vazio.")
    })
})

describe("checkSellAmountValidity", () => {
    const products = [
        { id: "123", product_name: "product_1", brand: "brand", type: "type", price: "20", amount: 2 },
        { id: "321", product_name: "product_2", brand: "brand", type: "type", price: "10", amount: 2 }
    ]

    const setErrorMock = jest.fn()
    jest.spyOn(React, "useState").mockImplementationOnce(initState => [initState, setErrorMock])
    

    it("should return true if value", () => {
        const sale = { date: new Date(), cashier: {_id: "123", name: "cashier"}, buyer: {_id: "123", name: "buyer"}, product: { _id:"123", name: "product_1" }, amount: 1 }

        const validity = checkSellAmountValidity(products, sale, setErrorMock)

        expect(validity).toBe(true)
    })

    it("should return false if !value", () => {

        const sale = { date: new Date(), cashier: {_id: "123", name: "cashier"}, buyer: {_id: "123", name: "buyer"}, product: { _id:"123", name: "product_1" }, amount: 0 }

        const validity = checkSellAmountValidity(products, sale, setErrorMock)

        expect(validity).toBe(false)
    })

    it("should return false sale product amount > product amount", () => {
        const sale = { date: new Date(), cashier: {_id: "123", name: "cashier"}, buyer: {_id: "123", name: "buyer"}, product: { _id:"123", name: "product_1" }, amount: 3 }
        
        const validity = checkSellAmountValidity(products, sale, setErrorMock)

        expect(validity).toBe(false)
        expect(setErrorMock).toHaveBeenCalledWith("Você possui 2 desse produto em estoque. Não é possível cadastrar a venda com uma quantidade acima.")
    })

    it("shoud setError", () => {
        const sale = { date: new Date(), cashier: {_id: "123", name: "cashier"}, buyer: {_id: "123", name: "buyer"}, product: { _id:"123", name: "product_1" }, amount: 0 }

        checkSellAmountValidity(products, sale, setErrorMock)

        expect(setErrorMock).toHaveBeenCalledWith("Quantidade não pode ser zerado.")
    })
})

describe("checkAmountValidity", () => {
    const setErrorMock = jest.fn()
    jest.spyOn(React, "useState").mockImplementationOnce(initState => [initState, setErrorMock])

    it("should return true if value", () => {
        const value = 1
        const validity = checkAmountValidity(value, setErrorMock)

        expect(validity).toBe(true)
    })

    it("should return false if !value", () => {
        const value = 0
        const validity = checkAmountValidity(value, setErrorMock)

        expect(validity).toBe(false)
    })

    it("shoud setError", () => {
        const value = 0
        checkAmountValidity(value, setErrorMock)

        expect(setErrorMock).toHaveBeenCalledWith("Quantidade não pode ser zerado.")
    })
})

describe("checkCashierValidity", () => {
    const setErrorMock = jest.fn()
    jest.spyOn(React, "useState").mockImplementationOnce(initState => [initState, setErrorMock])

    it("should return true if value", () => {
        const value = "value"
        const validity = checkCashierValidity(value, setErrorMock)

        expect(validity).toBe(true)
    })

    it("should return false if !value", () => {
        const value = ""
        const validity = checkCashierValidity(value, setErrorMock)

        expect(validity).toBe(false)
    })

    it("shoud setError", () => {
        const value = ""
        checkCashierValidity(value, setErrorMock)

        expect(setErrorMock).toHaveBeenCalledWith("Vendedor não pode ser vazio.")
    })
})

