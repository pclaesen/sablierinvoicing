// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity >=0.8.22;

import { console2, Test } from "forge-std/src/Test.sol";
import { ISablierV2LockupLinear } from "@sablier/v2-core/src/interfaces/ISablierV2LockupLinear.sol";

import { BatchLLStreamCreator } from "../src/StreamCreator.sol";

contract StreamCreatorTest is Test {
    // Get the latest deployment address from the docs: https://docs.sablier.com/contracts/v2/deployments
    address internal constant SABLIER_ADDRESS = address(0x3E435560fd0a03ddF70694b35b673C25c65aBB6C);

    // Test contracts
    BatchLLStreamCreator internal creator;
    ISablierV2LockupLinear internal sablier;
    address internal user;

    address internal alice = address(0x1000);
    address internal bob = address(0x2000);
    address internal charlie = address(0x3000);
    address[] internal recipientsArray;

    function setUp() public {
        // Load the Sablier contract from Ethereum Mainnet
        sablier = ISablierV2LockupLinear(SABLIER_ADDRESS);

        // Deploy the stream creator contract
        creator = new BatchLLStreamCreator();

        // Create a test user
        user = payable(makeAddr("User"));
        vm.deal({ account: user, newBalance: 1 ether });

        // Mint some USDC tokens to the test user, which will be pulled by the creator contract
        deal({ token: address(creator.USDC()), to: user, give: 1337e18 });

        // Make the test user the `msg.sender` in all following calls
        vm.startPrank({ msgSender: user });

        // Approve the creator contract to pull USDC tokens from the test user
        creator.USDC().approve({ spender: address(creator), value: 1337e18 });
    }

    // Test that creating streams works by checking the stream ids
    function test_CreateStream() public {
        recipientsArray = [bob, charlie];
        uint256[] memory streamIds = creator.batchCreateStreams(10e6, recipientsArray);
        console2.log("Stream 0 ID", streamIds[0]);
        console2.log("Stream 1 ID", streamIds[1]);
    }

    function testWithdrawFromStream() public {
        test_CreateStream();
        vm.warp(block.timestamp + 5 days);
        vm.startPrank(bob);
        sablier.withdrawMax(10, bob);
        vm.stopPrank();

        console2.log("Amount withdrawn", sablier.getWithdrawnAmount(10));

        vm.warp(block.timestamp + 10 days);
        vm.startPrank(bob);
        sablier.withdrawMax(10, bob);
        vm.stopPrank();

        console2.log("Amount withdrawn", sablier.getWithdrawnAmount(10));

        vm.warp(block.timestamp + 20 days);
        vm.startPrank(bob);
        sablier.withdrawMax(10, bob);
        vm.stopPrank();

        console2.log("Amount withdrawn", sablier.getWithdrawnAmount(10));

        vm.warp(block.timestamp + 30 days);
        vm.startPrank(bob);
        sablier.withdrawMax(10, bob);
        vm.stopPrank();

        console2.log("Amount withdrawn", sablier.getWithdrawnAmount(10));
    }
}