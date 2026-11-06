import jwt
from fastapi import HTTPException, status
from utils.internal_server_message import INTERNAL_SERVER_ERROR_MESSAGE

def generate_token(key: str, payload: dict, algorithm: str):
    generated_token = jwt.encode(payload=payload, key=key, algorithm=algorithm)

    return { "token": generated_token }

def authenticate_token(token: str, key: str, algorithms: list[str]):
    FORBIDDEN_EXCEPTION = HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="You don't have access to this page.")

    if token == None:
        raise FORBIDDEN_EXCEPTION

    try:
        decoded_token = jwt.decode(jwt=token, key=key, algorithms=algorithms)
    except jwt.InvalidKeyError:
        raise FORBIDDEN_EXCEPTION
    except jwt.InvalidAlgorithmError:
        raise FORBIDDEN_EXCEPTION
    except jwt.InvalidSignatureError:
        raise FORBIDDEN_EXCEPTION
    except jwt.ExpiredSignatureError:
        raise FORBIDDEN_EXCEPTION
    except Exception as error:
        print(error)
        raise INTERNAL_SERVER_ERROR_MESSAGE

    return decoded_token