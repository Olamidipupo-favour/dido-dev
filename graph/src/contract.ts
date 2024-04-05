import {
  Transfer as TransferEvent,
} from "../generated/Contract/Contract"
import {
  Transfer,
} from "../generated/schema"

export function handleTransfer(event: TransferEvent): void {
  let id = event.transaction.hash.concatI32(event.logIndex.toI32())
  let transfer = Transfer.load(id);
  if (!transfer){
    transfer = new Transfer(id);
  }
  transfer.sender = event.params.from
  transfer.receiver = event.params.to
  transfer.amount = event.params.value
  transfer.blockNumber = event.block.number
  transfer.blockTimestamp = event.block.timestamp
  transfer.transactionHash = event.transaction.hash
  transfer.save()
}