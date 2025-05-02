class Snowflake {
  constructor(epoch = 1700000000000n, machineId = 1n) {
    this.epoch = epoch; // 기준 타임스탬프 (기본값: 2023년 11월 기준)
    this.machineId = machineId & 0x3FFn; // 10비트 (1024개 노드)
    this.sequence = 0n; // 12비트 시퀀스 (0~4095)
    this.lastTimestamp = -1n;
  }

  // 현재 타임스탬프 가져오기 (밀리초 단위)
  currentTimestamp() {
    return BigInt(Date.now());
  }

  // 새로운 ID 생성
  nextId() {
    let timestamp = this.currentTimestamp() - this.epoch;

    if (timestamp === this.lastTimestamp) {
      this.sequence = (this.sequence + 1n) & 0xFFFn; // 12비트 시퀀스 (4096)
      if (this.sequence === 0n) {
        while (timestamp <= this.lastTimestamp) {
          timestamp = this.currentTimestamp() - this.epoch; // 다음 밀리초까지 대기
        }
      }
    } else {
      this.sequence = 0n;
    }

    this.lastTimestamp = timestamp;

    // ID 조합 (41비트 타임스탬프 | 10비트 머신 ID | 12비트 시퀀스)
    return (timestamp << 22n) | (this.machineId << 12n) | this.sequence;
  }
}

// 사용 예제
const snowflake = new Snowflake(1700000000000n, 123n);
console.log(snowflake.nextId().toString()); // 고유한 64비트 ID 출력
