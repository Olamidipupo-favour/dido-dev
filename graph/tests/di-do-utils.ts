import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import { Donate } from "../generated/DiDo/DiDo"

export function createDonateEvent(
  from: Address,
  to: Address,
  amount: BigInt
): Donate {
  let donateEvent = changetype<Donate>(newMockEvent())

  donateEvent.parameters = new Array()

  donateEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  donateEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  donateEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return donateEvent
}
