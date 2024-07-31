// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity >=0.8.22;

import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import { ud60x18 } from "@prb/math/src/UD60x18.sol";
import { ISablierV2LockupLinear } from "@sablier/v2-core/src/interfaces/ISablierV2LockupLinear.sol";
import { Broker, LockupLinear } from "@sablier/v2-core/src/types/DataTypes.sol";
import { ISablierV2BatchLockup } from "@sablier/v2-periphery/src/interfaces/ISablierV2BatchLockup.sol";
import { BatchLockup } from "@sablier/v2-periphery/src/types/DataTypes.sol";

contract BatchLLStreamCreator {
    // Sepolia addresses
    IERC20 public constant USDC = IERC20(0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238);
    // See https://docs.sablier.com/contracts/v2/deployments for all deployments
    ISablierV2LockupLinear public constant LOCKUP_LINEAR =
        ISablierV2LockupLinear(0x3E435560fd0a03ddF70694b35b673C25c65aBB6C);
    ISablierV2BatchLockup public constant BATCH_LOCKUP =
        ISablierV2BatchLockup(0x04A9c14b7a000640419aD5515Db4eF4172C00E31);

    /// @dev For this function to work, the sender must have approved this dummy contract to spend USDC.
    function batchCreateStreams(
        uint128 perStreamAmount,
        address[] memory _recipientsArray
        ) 
        public 
        returns (uint256[] memory streamIds)
        {
        // Create a batch of two streams
            uint256 batchSize = 2;

            // Calculate the combined amount of USDC assets to transfer to this contract
            uint256 transferAmount = perStreamAmount * batchSize;

            // Transfer the provided amount of USDC tokens to this contract
            USDC.transferFrom(msg.sender, address(this), transferAmount);

            // Approve the Batch contract to spend USDC
            USDC.approve({ spender: address(BATCH_LOCKUP), value: transferAmount });

            // Declare the first stream in the batch
            BatchLockup.CreateWithDurationsLL memory stream0;
            stream0.sender = msg.sender; // The sender to stream the assets, he will be able to cancel the stream
            stream0.recipient = address(_recipientsArray[0]); // The recipient of the streamed assets
            stream0.totalAmount = perStreamAmount; // The total amount of each stream, inclusive of all fees
            stream0.cancelable = true; // Whether the stream will be cancelable or not
            stream0.transferable = false; // Whether the recipient can transfer the NFT or not
            stream0.durations = LockupLinear.Durations({
                cliff: 0 seconds, // Assets will be unlocked only after 4 weeks
                total: 52 weeks // Setting a total duration of ~1 year
            });
            stream0.broker = Broker(address(0), ud60x18(0)); // Optional parameter left undefined

            // Declare the second stream in the batch
            BatchLockup.CreateWithDurationsLL memory stream1;
            stream1.sender = msg.sender; // The sender to stream the assets, he will be able to cancel the stream
            stream1.recipient = address(_recipientsArray[1]); // The recipient of the streamed assets
            stream1.totalAmount = perStreamAmount; // The total amount of each stream, inclusive of all fees
            stream1.cancelable = false; // Whether the stream will be cancelable or not
            stream1.transferable = false; // Whether the recipient can transfer the NFT or not
            stream1.durations = LockupLinear.Durations({
                cliff: 0 seconds, // Assets will be unlocked only after 4 weeks
                total: 52 weeks // Setting a total duration of ~1 year
            });
            stream1.broker = Broker(address(0), ud60x18(0)); // Optional parameter left undefined

            // Fill the batch param
            BatchLockup.CreateWithDurationsLL[] memory batch = new BatchLockup.CreateWithDurationsLL[](batchSize);
            batch[0] = stream0;
            batch[1] = stream1;

            streamIds = BATCH_LOCKUP.createWithDurationsLL(LOCKUP_LINEAR, USDC, batch);
        }
}