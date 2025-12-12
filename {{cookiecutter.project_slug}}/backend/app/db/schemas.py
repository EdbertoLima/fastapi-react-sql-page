from pydantic import BaseModel
import typing as t


class UserBase(BaseModel):
    email: str
    is_active: bool = True
    is_superuser: bool = False
    first_name: t.Optional[str] = None
    last_name: t.Optional[str] = None


class UserOut(UserBase):
    pass


class UserCreate(UserBase):
    password: str

    class Config:
        from_attributes = True


class UserEdit(UserBase):
    password: t.Optional[str] = None

    class Config:
        from_attributes = True


class User(UserBase):
    id: int

    class Config:
        from_attributes = True


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    email: t.Optional[str] = None
    permissions: str = "user"
