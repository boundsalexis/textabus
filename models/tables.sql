USE alexisbounds;
-- ROW=["route_id","agency_id","route_short_name","route_long_name","route_desc","route_type","route_url","route_color","route_text_color"]
CREATE TABLE routes(
    route_id integer NOT NULL,
    agency_id VARCHAR(50),
    route_short_name integer NOT NULL,
    route_long_name integer NOT NULL,
    route_desc VARCHAR(50) NULL,
    route_type VARCHAR(50) Null,
    route_url VARCHAR(100) NOT NULL
    route_color VARCHAR(50) NULL,
    route_text_color VARCHAR(50) NULL
    PRIMARY KEY (route_id)AZAaAAAAAAAA
)
-- ROW=["route_id","service_id","trip_id","trip_headsign","direction_id","block_id","shape_id"]
CREATE TABLE trips(
    route_id integer NOT NULL,
    service_id integer,
    trip_id integer,
    trip_headsign VARCHAR(50),
    direction_id integer,
    block_id integer,
    shape_id integer,
    PRIMARY KEY (trip_id),
    FOREIGN KEY (route_id) REFERENCES routes(route_id)

)
-- ROW=["stop_id","stop_code","stop_name","stop_desc","stop_lat","stop_lon","zone_id","stop_url"]

CREATE TABLE stops(
    stop_id integer NOT NULL,
    stop_code integer,
    stop_name VARCHAR(50),
    stop_desc VARCHAR(50) NULL,
    stop_lat integer,
    stop_lon integer,
    zone_id integer NULL,
    stop_url VARCHAR(50) NULL,
    PRIMARY KEY (stop_id)
)
-- Trip_id,arrival_time,departure_time,stop_id,stop_sequence,stop_headsign,pickup_type,drop_off_type,shape_dist_traveled
CREATE TABLE stop_times(
    trip_id integer NOT NULL,
    arrival_time TIME(0),
    departure_time TIME(0),
    stop_id integer,
    stop_sequence integer,
    stop_headsign VARCHAR(50) NULL,
    pickup_type VARCHAR(50) NULL,
    drop_off_type VARCHAR(50) NULL,
    shape_dist_traveled VARCHAR(50) NULL,
    FOREIGN KEY (trip_id) REFERENCES trips(trip_id)

)