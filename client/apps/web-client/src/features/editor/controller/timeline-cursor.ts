class TimelineCursor {
  constructor(public position = 0) {}

  setPosition(position: number) {
    this.position = position;
  }

  getPosition() {
    return this.position;
  }
}

export default TimelineCursor;
