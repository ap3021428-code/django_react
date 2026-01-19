import logging
from rest_framework.views import exception_handler


logger=logging.getLogger("app")


from rest_framework.response import Response
from rest_framework import status

def global_exception_handler(exc, context):
    request = context.get("request")

    response = exception_handler(exc, context)

    if response is not None:
        logger.warning(
            f"Handled Exception | path={request.path} | method={request.method} | response={response.data}"
        )
        return response

    logger.error(
        f"Unhandled Exception | path={request.path} | method={request.method}",
        exc_info=True
    )

    return Response(
        {
            "error": "Internal Server Error",
            "message": "Something went wrong. Please try again later."
        },
        status=status.HTTP_500_INTERNAL_SERVER_ERROR
    )


