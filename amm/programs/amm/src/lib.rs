#![allow(unexpected_cfgs)]
use anchor_lang::prelude::*;

declare_id!("A3L84HGiKHijqdm8xSZCea9npfc7aa4nxiGTvL5AwDka");

mod instructions;
mod state;

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
}

