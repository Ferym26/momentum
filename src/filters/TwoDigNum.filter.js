export default function TwoDigNum(value) {
	if (value > 0 && value < 10) {
		return `0${value}`
	} else {
		return value
	}
}
