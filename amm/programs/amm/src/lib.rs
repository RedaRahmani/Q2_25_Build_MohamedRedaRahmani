#![allow(unexpected_cfgs)]
use anchor_lang::prelude::*;

declare_id!("A3L84HGiKHijqdm8xSZCea9npfc7aa4nxiGTvL5AwDka");

mod instructions;
mod state;

use instructions::*;

#[program]
pub mod amm {
    use super::*;

    pub fn initialize(
        ctx: Context<Initialize>, 
        seed: u64,
        fee: u16,
        authority: Option<Pubkey>,
    ) -> Result<()> {
        ctx.accounts.init(seed, fee, authority, ctx.bumps)
    }

    pub fn deposit(
        ctx: Context<Deposit>, 
        amount: u64,
        max_x: u64,
        max_y: u64,
    ) -> Result<()> {
        ctx.accounts.deposit(amount, max_x, max_y)
    }
}

