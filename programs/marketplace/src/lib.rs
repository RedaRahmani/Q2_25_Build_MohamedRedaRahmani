#![allow(unxpected_cfgs)]
use anchor_lang::prelude::*;
mod instructions;
mod state;
use instructions::*;


declare_id!("EUeYLTk3zwwcdPAfCQjhqMqH6TetBpHuMjmNRETSczid");

#[program]
pub mod marketplace {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>, name: String, fee: u16) -> Result<()> {
        ctx.accounts.init(name, fee, &ctx.bumps)?;
        Ok(())
    }
}