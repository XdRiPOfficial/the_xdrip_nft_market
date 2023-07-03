/*                                  :+*********-                                                  .+*********=
                                    =%%%%%%%%%*:                                              .+%%%%%%%%%*:
                                      =%%%%%%%%%#-                                          .+%%%%%%%%%*:
                                        =%%%%%%%%%*:                                      .+%%%%%%%%%*:
                                         .+%%%%%%%%%*:                                  .+%%%%%%%%%*:
                                           .+%%%%%%%%%*:                               =%%%%%%%%%*:
                                             .+%%%%%%%%%*:                           =%%%%%%%%%*:
                                               .+%%%%%%%%%*:                       =%%%%%%%%%#-
                                                 .+%%%%%%%%%*:                   =%%%%%%%%%*-
                                                   .+%%%%%%%%%*-              :+%%%%%%%%%#-
                                                     .+%%%%%%%%%%*=-:.....:-+#%%%%%%%%%#-
                                                       .+%%%%%%%%%%%%%%%%%%%%%%%%%%%%#-
                                                         .=#%%%%%%%%%%%%%%%%%%%%%%%*:
                                                            :=*%%%%%%%%%%%%%%%%#+-
                                                               .:-=++***++=-:

                                 .............          .----------:.          ......      .-----------:
                                 ===============:       *%%********#%#=        -=====      -%%********#%%+.
                                 =======:.=======-      *%#         .*%#       -=====      -%%.         +%%:
                                 ======.   -======.     *%#          :%%:      -=====      -%%.          %%+
                                 =====.     -=====:     *%#          =%#       -=====      -%%.         +%%:
                                 ====.       -====:     *%%*****+=:   :        -=====      -%%*********%%+.
                                 ===-        :====:     *%#----=+%%*.          -=====      -%%=--------:
                                 ====-.      -====.     *%#       +%%=         -=====      -%%.
                                 =====--:.:-=====:      *%#        .*%#-       -=====      -%%.
                                 =============-:        *%#          -#%*:     -=====      -%%.
                                 ..........             .:.            :::      ....        ..

                                                              :-=**##%%%##*+=:.
                                                          .=*%%%%%%%%%%%%%%%%%%#+:
                                                        -*%%%%%%%%%%%%%%%%%%%%%%%%#=.
                                                      -#%%%%%%%%%%%%####%%%%%%%%%%%%%+.
                                                    -#%%%%%%%%%*=:.       .-+%%%%%%%%%%+.
                                                  -#%%%%%%%%#=.               :*%%%%%%%%%+.
                                                -#%%%%%%%%%=                    :*%%%%%%%%%+.
                                              -#%%%%%%%%%=                        :*%%%%%%%%%+
                                            -#%%%%%%%%%=                            :#%%%%%%%%%=
                                          :#%%%%%%%%%=                                :#%%%%%%%%%=
                                        -#%%%%%%%%%=                                    :#%%%%%%%%%=
                                      :#%%%%%%%%%=                                        -#%%%%%%%%%=
                                    :*%%%%%%%%%+.                                           -#%%%%%%%%%=
                                  :*%%%%%%%%%+.                                               -#%%%%%%%%#=
                                 -==========.                                                   -==========.

      ##     ## ######## ########     ###    ##        ######      #######  ########    ##     ##  #######  ##    ##  #######  ########
      ###   ### ##       ##     ##   ## ##   ##       ##    ##    ##     ## ##          ##     ## ##     ## ###   ## ##     ## ##     ##
      #### #### ##       ##     ##  ##   ##  ##       ##          ##     ## ##          ##     ## ##     ## ####  ## ##     ## ##     ##
      ## ### ## ######   ##     ## ##     ## ##        ######     ##     ## ######      ######### ##     ## ## ## ## ##     ## ########
      ##     ## ##       ##     ## ######### ##             ##    ##     ## ##          ##     ## ##     ## ##  #### ##     ## ##   ##
      ##     ## ##       ##     ## ##     ## ##       ##    ##    ##     ## ##          ##     ## ##     ## ##   ### ##     ## ##    ##
      ##     ## ######## ########  ##     ## ########  ######      #######  ##          ##     ##  #######  ##    ##  #######  ##     ##

                                                 DESIGNED AND BUILT BY THE DEV TEAM OF XDRIP
                                                              OG JIM & OG BRAD

 The XdRiP Dev Team that made this contract possible:
 OG Brad - Owner and Master Coder
 OG Matt - Master Web Developer and Script Coder
 Jim C OG - Contract Code Developer and Marketing Guru
 OG Amos - Master Public Relations and Promotional & Advertising Guru
 OG Flo - Master Graphics and 3D Designer


                                                 (c) 2022 All Right Reserved - XdRiP(tm) 2022
                                      Dont steal it, Dont copy it, Dont steal parts of it, Dont FUCK with it!

 @title Medals of Honor Elite XdRiP NFT Collection
 @authors Jim C OG and OG Brad & team
 @notice This smart contract is for managing the XdRiP XRP reward token NFTs gallery. A multi tiered, extremely limited collection
 @disclaimer - This contract interacts on the BSC. All cryptocurrency transactions carry inherent risk. Use this contract and associated dApps at your own risk
*/


// SPDX-License-Identifier: MIT



pragma solidity 0.8.17;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@thirdweb-dev/contracts/extension/ContractMetadata.sol";


/* Medals of Honor Smart Contract by XdRiP */
contract XdRiP_Medals_Of_Honor is ERC721Enumerable, Ownable, ReentrancyGuard {
    using Counters for Counters.Counter;
    using SafeMath for uint256;
    
    /* @param token supply - editable cooldown times */
    uint8 public constant commonSupply = 100;
    uint8 public constant uncommonSupply = 80;
    uint8 public constant rareSupply = 60;
    uint8 public constant epicSupply = 40;
    uint8 public constant legendarySupply = 40;
    uint256 public constant mintCooldown = 30 days;
    uint256[] public cooldownTimes = [0, 30, 30, 30, 30]; 

    /* @param editable default mint prices unless updated */
    uint256 public commonPrice = 0.25 ether;
    uint256 public uncommonPrice = 0.5 ether;
    uint256 public rarePrice = 0.75 ether;
    uint256 public epicPrice = 1 ether;
    uint256 public legendaryPrice = 1.25 ether;

    /* @dev wallets for deploy - editable */    
    address payable private xDripBuybacksWallet;
    address payable private stakingRewardsWallet;
    address payable private marketingWallet;
    address payable private giveawaysWallet;
    address payable private teamWallet;
    
    /* @param using Counters for comparison/tracking */
    Counters.Counter private _commonCounter;
    Counters.Counter private _uncommonCounter;
    Counters.Counter private _rareCounter;
    Counters.Counter private _epicCounter;
    Counters.Counter private _legendaryCounter;

    string private _contractURI;

    /* @dev mapping to store tokenURIs */
    mapping (uint256 => string) private _tokenURIs;

    /* @dev mapping token ID to IPFS hash */
    mapping(uint256 => string) private _tokenIPFSHashes;

    /* @dev mapping from address to last mint timestamp */
    mapping(address => mapping(uint256 => uint256)) private _lastMintTimestamp;

    /* @param distribution percentages struct */
    struct Percentages {
        uint16 xDripBuybacksPercentage;
        uint16 stakingRewardsPercentage;
        uint16 marketingPercentage;
        uint16 giveawaysPercentage;
        uint16 teamPercentage;
    }

    /* minting events */
    event CommonMinted(
        address indexed owner, 
        uint256 tokenId, 
        string ipfsHash
    );
    event UncommonMinted(
        address indexed owner,
        uint256 tokenId,
        string ipfsHash
    );
    event RareMinted(
        address indexed owner, 
        uint256 tokenId, 
        string ipfsHash
    );
    event EpicMinted(
        address indexed owner, 
        uint256 tokenId, 
        string ipfsHash
    );
    event LegendaryMinted(
        address indexed owner,
        uint256 tokenId,
        string ipfsHash
    );

    /* default percentages array for dev wallet distribution */
    Percentages private percentages = Percentages(20, 40, 15, 15, 10);
    
    /* deployer wallet is xdripsbuybackswallet unless updated */
    constructor(address payable _xdripsbuybackWallet)
        ERC721("Medals of Honor", "MOH")
    {
        xDripBuybacksWallet = _xdripsbuybackWallet;
    }
    
    /* @dev individual tier minting functions */
    function mintCommon(string memory ipfsHash) public payable {
        require(
            msg.value >= commonPrice,
            "INSUFFICIENT_BNB"
        );
        require(
            _commonCounter.current() < commonSupply,
            "SUPPLY_EMPTY"
        );
        require(balanceOf(msg.sender) == 0, "COMMON already minted");

        uint256 tokenId = _commonCounter.current();
        _mint(msg.sender, _commonCounter.current());
        _lastMintTimestamp[msg.sender][1] = block.timestamp;
        _tokenIPFSHashes[_commonCounter.current()] = ipfsHash;
        _commonCounter.increment();
        _setTokenURI(tokenId, ipfsHash);
        _distributeFunds();
        emit CommonMinted(msg.sender, tokenId, ipfsHash);
    }

    function mintUncommon(string memory ipfsHash) public payable {
        require(
            msg.value >= uncommonPrice,
            "INSUFFICIENT_BNB"
        );
        require(
            _uncommonCounter.current() < uncommonSupply,
            "SUPPLY_EMPTY"
        );
        require(
            balanceOf(msg.sender) == 1,
            "Must own COMMON to mint UNCOMMON"
        );
        require(
            _lastMintTimestamp[msg.sender][1] > 0,
            "No previous COMMON minted"
        );
        uint256 daysLeft = getCooldownDaysLeft(msg.sender, 1);
        if (daysLeft > 0) {
            revert("Cooldown not passed");
        } 
        uint256 tokenId = _uncommonCounter.current() + commonSupply;
        _mint(msg.sender, tokenId);
        _tokenIPFSHashes[tokenId] = ipfsHash;
        _uncommonCounter.increment();
        _lastMintTimestamp[msg.sender][2] = block.timestamp;
        _setTokenURI(tokenId, ipfsHash);
        _distributeFunds();
        emit UncommonMinted(msg.sender, tokenId, ipfsHash);
    }
    

    function mintRare(string memory ipfsHash) public payable {
        require(
            msg.value >= rarePrice,
            "INSUFFICIENT_BNB"
        );
        require(
            _rareCounter.current() < rareSupply,
            "SUPPLY_EMPTY"
        );
        require(
            balanceOf(msg.sender) == 2,
            "Must own UNCOMMON to mint RARE"
        );
        uint256 daysLeft = getCooldownDaysLeft(msg.sender, 2);
          if (daysLeft > 0) {
            revert("Cooldown not passed");
        } else {
            
            require(
                _lastMintTimestamp[msg.sender][2] +cooldownTimes[1] <=
                    block.timestamp,
                "Cooldown not passed"
            );
            uint256 tokenId = _rareCounter.current() + commonSupply + uncommonSupply;
           _mint(msg.sender, tokenId);
            _tokenIPFSHashes[tokenId] = ipfsHash;
            _rareCounter.increment();
            _lastMintTimestamp[msg.sender][3] = block.timestamp;
            _setTokenURI(tokenId, ipfsHash);
            _distributeFunds();
        emit RareMinted(msg.sender, tokenId, ipfsHash);
        }
    }

    function mintEpic(string memory ipfsHash) public payable {
        require(
            msg.value >= epicPrice,
            "INSUFFICIENT_BNB"
        );
        require(
            _epicCounter.current() < epicSupply,
            "SUPPLY_EMPTY"
        );
        require(
            balanceOf(msg.sender) == 3,
            "Must own RARE to mint EPIC"
        );
        uint256 daysLeft = getCooldownDaysLeft(msg.sender, 3);
           if (daysLeft > 0) {
            revert("Cooldown not passed");
        } else {
            
            require(
                _lastMintTimestamp[msg.sender][3] + cooldownTimes[2] <=
                block.timestamp,
                "Cooldown not passed"
            );
            uint256 tokenId = _epicCounter.current() + commonSupply + uncommonSupply + rareSupply;
           _mint(msg.sender, tokenId);
            _tokenIPFSHashes[tokenId] = ipfsHash;
            _epicCounter.increment();
            _lastMintTimestamp[msg.sender][4] = block.timestamp;
            _setTokenURI(tokenId, ipfsHash);
            _distributeFunds();
        emit EpicMinted(msg.sender, tokenId, ipfsHash);
        }
    }

    function mintLegendary(string memory ipfsHash) public payable {
    require(
        msg.value >= legendaryPrice,
        "INSUFFICIENT_BNB"
    );
    require(
        _legendaryCounter.current() < legendarySupply,
        "legendarySupply_EMPTY"
    );
    require(
        balanceOf(msg.sender) == 4,
        "Must own EPIC to mint LEGENDARY"
    );
    uint256 daysLeft = getCooldownDaysLeft(msg.sender, 4);
    if (daysLeft > 0) {
        revert("Cooldown not passed");
    } else {
        require(
            _lastMintTimestamp[msg.sender][4] + cooldownTimes[3] <=
                block.timestamp,
            "Cooldown not passed"
        );
        uint256 tokenId = _legendaryCounter.current() + commonSupply + uncommonSupply + rareSupply + epicSupply;
        _mint(msg.sender, tokenId);
        _tokenIPFSHashes[tokenId] = ipfsHash;
        _legendaryCounter.increment();
        _setTokenURI(tokenId, ipfsHash);
        _distributeFunds();
        emit LegendaryMinted(msg.sender, tokenId, ipfsHash);
    }
}
    /* contract withdrawal */
    function withdraw() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }

    /* @param configurable wallet distribution percentages */
    function setPercentages(
        uint16 xDripBuybacksPercentage,
        uint16 stakingRewardsPercentage,
        uint16 marketingPercentage,
        uint16 giveawaysPercentage,
        uint16 teamPercentage
    ) public onlyOwner {
        uint16 totalPercentage = xDripBuybacksPercentage +
            stakingRewardsPercentage +
            marketingPercentage +
            giveawaysPercentage +
            teamPercentage;
        require(totalPercentage == 100, "Percentages must = 100");
        percentages = Percentages(
            xDripBuybacksPercentage,
            stakingRewardsPercentage,
            marketingPercentage,
            giveawaysPercentage,
            teamPercentage
        );
    }

    /* @dev dev wallet distributions */
    function _distributeFunds() internal nonReentrant {
        uint256 totalFunds = address(this).balance;
        uint256 xDripBuybacksFunds = (totalFunds * percentages.xDripBuybacksPercentage / 100);
        xDripBuybacksWallet.transfer(xDripBuybacksFunds);
        uint256 stakingRewardsFunds = (totalFunds * percentages.stakingRewardsPercentage / 100);
        stakingRewardsWallet.transfer(stakingRewardsFunds);
        uint256 marketingFunds = (totalFunds * percentages.marketingPercentage / 100);
        marketingWallet.transfer(marketingFunds);
        uint256 giveawaysFunds = (totalFunds * percentages.giveawaysPercentage / 100);
        giveawaysWallet.transfer(giveawaysFunds);
        uint256 teamFunds = (totalFunds * percentages.teamPercentage / 100);
        teamWallet.transfer(teamFunds);
    }

    /* metadata URI functions */
    function _setTokenURI(uint256 tokenId, string memory _tokenURI) internal virtual {
        require(_exists(tokenId), "ERC721URIStorage: URI set MOH NFT does not exist");
        _tokenURIs[tokenId] = _tokenURI;
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");
        return _tokenURIs[tokenId];
    }

    function setContractURI(string memory newContractURI) public onlyOwner {
        _contractURI = newContractURI;
    }

    function contractURI() public view returns (string memory) {
        return _contractURI;
    }

    /* @dev get ipfs, eligibility */
    function getTokenIPFSHash(uint256 tokenId)
        public
        view
        returns (string memory)
    {
        require(_exists(tokenId), "NO_SUCH_NFT");
        return _tokenIPFSHashes[tokenId];
    }

    /* @param configurable distribution wallets */
    function updateDistributionWallets(
        address payable _xdripsbuybackWallet,
        address payable _stakingRewardsWallet,
        address payable _marketingWallet,
        address payable _giveawaysWallet,
        address payable _teamWallet
    ) public onlyOwner {
        xDripBuybacksWallet = _xdripsbuybackWallet;
        stakingRewardsWallet = _stakingRewardsWallet;
        marketingWallet = _marketingWallet;
        giveawaysWallet = _giveawaysWallet;
        teamWallet = _teamWallet;
    }

    /* determine elegibility */
    function getCooldownDaysLeft(address account, uint256 mintTier)
        public
        view
        returns (uint256)
    {
        require(mintTier > 0 && mintTier <= 5, "Invalid Medal");
        require(
            _lastMintTimestamp[account][mintTier] > 0,
            "No previous Medal for tier"
        );
        uint256 cooldownEnd = _lastMintTimestamp[account][mintTier] +
            cooldownTimes[mintTier];
        if (block.timestamp >= cooldownEnd) {
            return 0;
        }
        return (cooldownEnd - block.timestamp) / 1 days;
    }

    /* configurable cooldowntimes */
    function setCommonCooldown(uint256 cooldown) public onlyOwner {
        cooldownTimes[0] = cooldown;
    }

    function setUncommonCooldown(uint256 cooldown) public onlyOwner {
        cooldownTimes[1] = cooldown;
    }

    function setRareCooldown(uint256 cooldown) public onlyOwner {
        cooldownTimes[2] = cooldown;
    }

    function setEpicCooldown(uint256 cooldown) public onlyOwner {
        cooldownTimes[3] = cooldown;
    }

    function setLegendaryCooldown(uint256 cooldown) public onlyOwner {
        cooldownTimes[4] = cooldown;
    }

    /* configurable mint prices  */
    function setCommonPrice(uint256 price) public onlyOwner {
        commonPrice = price;
    }

    function setUncommonPrice(uint256 price) public onlyOwner {
        uncommonPrice = price;
    }

    function setRarePrice(uint256 price) public onlyOwner {
        rarePrice = price;
    }

    function setEpicPrice(uint256 price) public onlyOwner {
        epicPrice = price;
    }

    function setLegendaryPrice(uint256 price) public onlyOwner {
        legendaryPrice = price;
    }
}