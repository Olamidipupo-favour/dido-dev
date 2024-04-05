import { Donate as DonateEvent } from "../generated/DiDo/DiDo"
import { Donate } from "../generated/schema"

export function handleDonate(event: DonateEvent): void {
  let entity = new Donate(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.from = event.params.from
  entity.to = event.params.to
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
