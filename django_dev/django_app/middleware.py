import time
import logging

logger = logging.getLogger("app")

class RequestLoggingMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if request.path.startswith("/static/") or request.path.startswith("/admin/"):
            return self.get_response(request)

        start_time = time.time()
        response = self.get_response(request)
        duration = round((time.time() - start_time) * 1000, 2)

        user = (
            request.user.username
            if hasattr(request, "user") and request.user.is_authenticated
            else "anonymous"
        )

        logger.info(
            f"{request.method} {request.path} "
            f"{response.status_code} "
            f"{duration}ms user={user}"
        )

        return response
