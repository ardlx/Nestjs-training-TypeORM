
export class BaseController {

    retrievedResponse(response: any, data: any, message = "Record(s) retrieved successfully!") {
        const statusCode = 200

        this.apiResponse(response, statusCode, data, message)
    }
    
    createdResponse(response: any, data: any, message = "Record(s) created successfully!") {
        const statusCode = 201

        this.apiResponse(response, statusCode, data, message)
    }

    updatedResponse(response: any, data: any, message = "Record(s) updated successfully!") {
        const statusCode = 200

        this.apiResponse(response, statusCode, data, message)
    }

    deletedResponse(response: any, data: any, message = "Record(s) deleted successfully!") {
        const statusCode = 200

        this.apiResponse(response, statusCode, data, message)
    }

    apiResponse(response: any, statusCode: number, data: any, message: string) {
        response.status(statusCode).send({
            status: statusCode,
            message,
            data
        })
    }
}