from sqlmodel import SQLModel, create_engine, Session

DATABASE_URL = "mysql+pymysql://wahl:Uy9n2FPQ7%pM^H3@localhost:3306/wahl"
engine = create_engine(DATABASE_URL, echo=True, pool_pre_ping=True)


def create_db_and_tables():
    SQLModel.metadata.create_all(engine)


def get_session():
    with Session(engine) as session:
        yield session
