from fastapi import APIRouter, Depends
from sqlalchemy import text
from sqlmodel import Session
from app.database import get_session

router = APIRouter()

@router.get("/wahlbezirke/")
def get_bezirke_geojson(session: Session = Depends(get_session)):
    query = text("""
        SELECT
            id,
            bezirksnummer,
            uwb,
            uwb3,
            bwb,
            bwb3,
            awk,
            bez,
            bwk,
            ST_AsGeoJSON(geom) AS geometry
        FROM wahlbezirk
    """)
    rows = session.exec(query).all()

    features = []
    for row in rows:
        feature = {
            "type": "Feature",
            "geometry": row.geometry,
            "properties": {
                "id": row.id,
                "bezirksnummer": row.bezirksnummer,
                "uwb": row.uwb,
                "uwb3": row.uwb3,
                "bwb": row.bwb,
                "bwb3": row.bwb3,
                "awk": row.awk,
                "bez": row.bez,
                "bwk": row.bwk,
            }
        }
        import json
        feature["geometry"] = json.loads(feature["geometry"])
        features.append(feature)

    return {
        "type": "FeatureCollection",
        "features": features
    }
