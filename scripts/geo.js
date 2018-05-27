
/*
position is a lat/long object {latitude,longitude}
 */

let bound = undefined;

export class coordinates {
	/**
	 * @return {undefined}
	 */
	constructor (latitude, longitude) {
		if (typeof latitude === 'number') {
			this.latitude = latitude;
		} else {
			this.latitude = geolib.sexagesimal2decimal(latitude);
		}
		if (typeof longitude === 'number') {
			this.longitude = longitude;
		} else {
			this.longitude = geolib.sexagesimal2decimal(longitude);
		}
		if (!this.longitude ||!this.latitude) {
			return (undefined);
		}
	}

	get get_sexagesimal() {
		return {
			latitude: geolib.decimal2sexagesimal(this.latitude),
			longitude: geolib.decimal2sexagesimal(this.longitude)
		};
	}

	get get_decimal() {
		return {
			latitude: this.latitude,
			longitude: this.longitude
		};
	}
}

export function set_screen_properties(origin_coords, down_right_coord) {
	bound = {origin: origin_coords, dest: down_right_coord};
}

export function get_screen_pos(position) {
	if (!bound)
		return (undefined);
}