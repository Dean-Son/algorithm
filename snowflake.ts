class SnowflakeTS {
  private epoch: bigint; // 기준 타임스탬프 (기본값: 2023-11-15 기준)
  private machineId: bigint; // 10비트 머신 ID (0~1023)
  private sequence: bigint; // 12비트 시퀀스 번호 (0~4095)
  private lastTimestamp: bigint;

  constructor(epoch: bigint = 1700000000000n, machineId: number = 1) {
    this.epoch = epoch;
    this.machineId = BigInt(machineId) & 0x3ffn; // 10비트
    this.sequence = 0n; // 시퀀스 초기화
    this.lastTimestamp = -1n;
  }

  // 현재 타임스탬프 (밀리초 단위)
  private currentTimestamp(): bigint {
    return BigInt(Date.now());
  }

  // Snowflake ID 생성
  public nextId(): bigint {
    let timestamp = this.currentTimestamp() - this.epoch;

    if (timestamp === this.lastTimestamp) {
      this.sequence = (this.sequence + 1n) & 0xfffn; // 12비트 시퀀스 (4096)
      if (this.sequence === 0n) {
        while (timestamp <= this.lastTimestamp) {
          timestamp = this.currentTimestamp() - this.epoch; // 다음 밀리초까지 대기
        }
      }
    } else {
      this.sequence = 0n;
    }

    this.lastTimestamp = timestamp;

    // ID 생성 (41비트 타임스탬프 | 10비트 머신 ID | 12비트 시퀀스)
    return (timestamp << 22n) | (this.machineId << 12n) | this.sequence;
  }
}

// 사용 예제
// const snowflake = new Snowflake(1700000000000n, 123);
// console.log(snowflake.nextId().toString()); // 64비트 고유 ID 출력
